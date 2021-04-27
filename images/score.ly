% Default Emmentaler Font:  lilypond --svg --output=lilypond-default score.ly 
% Gonville Font:            lilypond -d include-settings=gonville.ily -I gonville/ --svg --output=lilypond-gonville score.ly
% Download Gonville resources from: https://www.chiark.greenend.org.uk/~sgtatham/gonville/
%
% On macOS, the path to the lilypond binary is /Applications/LilyPond.app/Contents/Resources/bin/lilypond
% To generate the SVG files, you will run: 
% /Applications/LilyPond.app/Contents/Resources/bin/lilypond -d include-settings=gonville.ily -I gonville/ --svg --output=lilypond-gonville score.ly 

#(set-default-paper-size "a0" 'landscape)

\pointAndClickOff

\version "2.21"

\paper {
  top-margin = 10
  left-margin = 10
  indent = 0
  horizontal-shift = 0
}

\header {
  tagline = ##f
}

\score { <<
    \new PianoStaff = "piano" <<
      \new Staff = "upper" { 
        \time 4/4
        \omit Staff.Clef
        \omit Staff.TimeSignature
        \magnifyStaff #16
        \override Staff.StaffSymbol.color = grey
        \clef "treble"
        <<
        \new Voice = "first" \relative c'' { \autoBeamOff \voiceOne e16 c8 e4 c2 c32}
        \new Voice= "second"
          \relative c'' { \autoBeamOff \voiceTwo c16 a8 c4 a2 a32 }
        >>
      }
    >>
  >>
  \layout {
    ragged-right = ##t
    \context {
      \Score
      \omit SystemStartBrace
      \override SpacingSpanner.common-shortest-duration = #(ly:make-moment 1/2)
    }
  }
}