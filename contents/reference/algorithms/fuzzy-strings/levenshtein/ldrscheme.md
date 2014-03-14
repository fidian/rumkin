---
title: "Levenshtein Distance Algorithm: Rscheme Implementation"
template: page.jade
---

by Joerg F. Wittenberger
	;;** Levenshtein

	;; See http://www.merriampark.com/ld.htm

	(define-glue (lev-init mx)
	{
	  int i,m = fx2int(mx), *p;
	  REG0 = bvec_alloc( sizeof(int) * (m+1), byte_vector_class );
	  p = (int*) PTR_TO_DATAPTR(REG0);
	  for(i=0; i<=m; ++i) p[i]=i;
	  RETURN1();
	})

	(define-glue (lev-dist d n)
	{
	  int *p=PTR_TO_DATAPTR(d);
	  REG0 = int2fx( p[ fx2int(n) ] );
	  RETURN1();
	})

	(define-glue (lev-step! matrix mx ix a b off)
	{
#define min(a, b) (((a) < (b)) ? (a) : (b))
	  int i=fx2int(ix), o=fx2int(off), m=fx2int(mx);
	  int *d_i = (int*) PTR_TO_DATAPTR(matrix);
	  unsigned char *s = string_text(a) + o;
	  unsigned char *t = string_text(b) + o;
	  int distance=d_i[0], j, left, cost;

	  d_i[0]=i;
	  for(j=1; j<=m; ++j) {               /* row loop */
		left = d_i[j];
		/* Step 5 */
		cost = s[i-1]==t[j-1] ? 0 : 1;
		/* Step 6 */
		d_i[j] =  min(min(d_i[j-1]+1, left+1), distance+cost);
		distance = left;
	  }
	  REG0 = int2fx(distance);
	  RETURN1();
	})

	(define-safe-glue (lev-0 (a &lt;string&gt;) (b &lt;string&gt;))
	{

	  unsigned char *s = string_text(a);
	  unsigned char *t = string_text(b);
	  int i=0, n=string_length(b), m=string_length(a);

	  /* skip common suffix */
	  while( m>0 && n>0 && s[m-1]==t[n-1] ) --m, --n;
	  /* skip common prefix */
	  while( m>0 && n>0 && s[i] == t[i] ) ++i, --m, --n;
	  
	  REG0 = int2fx(i);
	  REG1 = int2fx(m);
	  REG2 = int2fx(n);
	  RETURN(3);
	})

	(define (levenshtein-distance s t)
	  (receive
	   (off sl tl) (lev-0 s t)
		(cond
		 ((eqv? sl 0) tl)
		 ((eqv? tl 0) sl)
		 (else
		  (if (< tl sl)
			  (lev-exec (lev-init sl) s t off sl tl)
			  (lev-exec (lev-init tl) t s off tl sl))))))

	(define (lev-exec matrix s t o m n)
	  (do ((i 1 (add1 i)))
		  ((> i n) (lev-dist matrix m))
		(lev-step! matrix m i s t o)))

	(define (lev-exec< matrix s t o m n limit)
	  (let loop ((i 1) (distance 0))
		(cond
		 ((>= distance limit) #f)
		 ((> i n) (>= (lev-dist matrix m) limit))
		 (else (loop (add1 i) (lev-step! matrix m i s t o))))))

	(define (levenshtein< s t limit)
	  (receive
	   (off sl tl) (lev-0 s t)
		(cond
		 ((eqv? sl 0) (< tl limit))
		 ((eqv? tl 0) (< sl limit))
		 (else
		  (if (< tl sl)
			  (lev-exec< (lev-init sl) s t off sl tl limit)
			  (lev-exec< (lev-init tl) t s off tl sl limit))))))
