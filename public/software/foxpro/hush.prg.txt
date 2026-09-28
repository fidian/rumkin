* I find it annoying to have to "SET TALK ON", "SET TALK OFF", "SET TALK
* ON", etc.  I also find it irritating that I need to sometimes check the
* status of TALK, then possibly turn it off and process and turn it back on.
* These two functions will help you out.  Do not call Hush() again until after
* you call UnHush() - the functions won't work well that way.

* Equivalent to a "SET TALK OFF"
function Hush
    public m.UnHushTalkOn

    if sys(103) = "ON"
        set talk off
        m.UnHushTalkOn = .T.
    endif
endfunc

* Checks if TALK used to be ON.  If so, turns it back on
function UnHush
    public m.UnHushTalkOn

    if type('m.UnHushTalkOn') = 'L'
        if m.UnHushTalkOn == .T.
            m.UnHushTalkOn = .F.
            set talk on
        endif
        release m.UnHushTalkOn
    endif
endfunc
