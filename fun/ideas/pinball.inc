<p>In order to design a good pinball game for Palm OS, I needed to figure
out a good way to bounce a ball off of a wall.  With straight walls (up and
down; left and right), this is no problem.  I wanted perfect realism because
the pinball games seem to be cheating and bouncing off in whatever direction
they so desired.</p>

<p>After asking around, I was told about an elementary reflector matrix,
also known as the <a
href="http://www.cs.ut.ee/~toomas_l/linalg/lin2/node6.html">Householder
reflection matrix</a>.</p>

<?PHP MathFormulaBox('R = I - 2 {V \times V ^ T\over V ^ T \times V}') ?>

<p><?PHP MathFormulaInline('R^2') ?> = the identity matrix.  
To find out more, look for the following terms:  elementary reflector,
symmetric, orthogonal.  The basic idea is to figure out the reflector matrix
ahead of time (when possible) and then use the matrix to bounce the ball
instead of using lots of trig.</p>

<p>At least, if I can get this matrix operation to work, it would eliminate
(potentially) the entire use of MathLib because I would not need any sqrt(),
cos(), sin(), or other trig functions.</p>

<p>I have whipped up come C code to make a normalized vector out of any
vector:</p>

<?PHP MakeBoxTop('center') ?>
<pre>
struct Vector { double X, double Y };

void MakeNormalVector(Vector *From, Vector *To)
{
   double Scale = sqrt(From->X * From->X + From->Y * From->Y);
   To->X = From->X / Scale;
   To->Y = From->Y / Scale;
}
</pre>
<?PHP MakeBoxBottom() ?>
