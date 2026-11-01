# Interactive Alphabet Learning Website --- Project Plan

## 1. Project overview

Build a child-friendly website that teaches students to construct all 26
lowercase and 26 uppercase English letters using draggable handwriting
patterns.

The website should transform a printable alphabet worksheet into an
interactive learning experience. Students choose lowercase or uppercase
letters, select the required stroke patterns, drag them into the
matching parts of a dotted letter outline, and receive immediate
feedback when each pattern is placed correctly.

### Primary goals

-   Teach letter formation through individual strokes rather than
    passive tracing alone.
-   Preserve the dotted handwriting appearance and letter shapes shown
    in the supplied lowercase worksheet.
-   Support all 26 lowercase and all 26 uppercase letters.
-   Make the interaction intuitive for young children.
-   Work with mouse, touchscreen, tablet, and mobile devices.

## 2. Reference worksheet requirements

The uploaded worksheet is the authoritative visual reference for
lowercase letters.

Preserve these characteristics:

  -----------------------------------------------------------------------
  Element                             Requirement
  ----------------------------------- -----------------------------------
  Letter style                        Dotted handwriting

  Letter shapes                       Match the supplied worksheet

  `a`                                 Single-storey lowercase a

  `g`                                 Single-storey lowercase g

  `i` and `j`                         Separate dotted marks

  Dots                                Small and evenly spaced

  Background                          White

  Grid/reference layout               Four-column worksheet grid, if
                                      reproducing the worksheet overview

  Letter order                        a to z, left to right
  -----------------------------------------------------------------------

**Important:** Do not substitute ordinary Arial, Times New Roman, or
generic default-font glyphs for the reference letter shapes. Create
accurate SVG paths for each glyph, or use a verified matching
handwriting font and convert its glyphs into paths. Inspect the result
against the uploaded worksheet.

The uploaded image should be retained as a design reference during
implementation. It is not necessary to reproduce the worksheet's
branding, character artwork, or copyright footer unless separately
requested. The essential reference is the handwriting shape and dotted
treatment.

## 3. Website screens and navigation

The website has three primary screen types:

1.  Home page.
2.  Lowercase alphabet selection and practice.
3.  Uppercase alphabet selection and practice.

### 3.1 Home page

Show two large, clearly differentiated choices:

-   **Small Letters** --- a to z.
-   **Capital Letters** --- A to Z.

The home page should include:

-   A friendly title such as "ABC Learning World".
-   A short instruction such as "Let's learn to write!"
-   Two large clickable cards or buttons.
-   Child-friendly illustrations and a simple colour palette.
-   Responsive layout for desktop, tablet, and mobile.

### 3.2 Alphabet selection

After choosing lowercase or uppercase, show all 26 letters in a
selectable grid.

Requirements:

-   Display the letters in alphabetical order.
-   Clearly indicate the selected letter.
-   Show which letters have been completed.
-   Allow students to jump directly to a letter.
-   Provide a Home control to return to the landing page.
-   Keep the selection interface simple and easy for young children.

### 3.3 Practice page

Each practice page should contain:

1.  A header showing the alphabet type and current letter.
2.  A large dotted target letter in the workspace.
3.  A pattern selection panel with named draggable patterns.
4.  A progress indicator for the current letter and alphabet.
5.  Previous, Next, Reset, and Home controls.
6.  Clear success feedback when a stroke or full letter is completed.

Suggested layout:

-   Centre: large dotted letter workspace.
-   Side panel on desktop: available patterns and their names.
-   Bottom panel on smaller screens: available patterns and their names.
-   Navigation controls: consistently placed and easy to tap.

## 4. Lowercase handwriting requirements

Implement all 26 lowercase letters using the exact handwriting style in
the supplied reference:

`a b c d e f g h i j k l m n o p q r s t u v w x y z`

The lowercase `a` and `g` must use the single-storey forms shown in the
worksheet.

Each letter must have:

-   A complete dotted reference outline.
-   Individually defined stroke paths.
-   One or more target regions for its component strokes.
-   A list of required pattern pieces.
-   Correct target positions and orientations.
-   A completion state for each required stroke.

Do not assume that a letter's visual outline can always be represented
by a simplistic list of straight lines and generic curves. Some letters
contain compound or continuous shapes. For example, `m` has multiple
humps, `s` has a continuous curved form, and `g` requires the correct
single-storey shape.

### Initial lowercase pattern vocabulary

Use a reusable library of named pattern types. The exact segmentation
for each letter must be checked against the handwriting style and the
teaching method.

  Pattern name    Meaning
  --------------- ---------------------------------
  Standing Line   Vertical stroke
  Sleeping Line   Horizontal stroke
  Left Curve      Curve bending towards the left
  Right Curve     Curve bending towards the right
  Top Curve       Upper curved stroke
  Bottom Curve    Lower curved stroke
  Diagonal Line   Slanting stroke
  Circle          Circular stroke
  Dot             Small circular mark

The pattern tray should display only the pieces required for the current
letter, with a clear name under each piece.

### Illustrative lowercase pattern mapping

This is an initial teaching breakdown, not final SVG geometry. Refine
the stroke count, direction, and segmentation during
handwriting-reference preparation.

  Letter   Initial pattern description
  -------- -------------------------------------
  a        Curve, Standing Line
  b        Standing Line, Curve
  c        Curve
  d        Curve, Standing Line
  e        Curve, Sleeping Line
  f        Curve, Standing Line, Sleeping Line
  g        Curve, Standing Line
  h        Standing Line, Curve
  i        Standing Line, Dot
  j        Standing Line, Curve, Dot
  k        Standing Line, Diagonal Lines
  l        Standing Line
  m        Standing Line, multiple Curves
  n        Standing Line, Curve
  o        Curve
  p        Standing Line, Curve
  q        Curve, Standing Line
  r        Standing Line, Curve
  s        Curves
  t        Standing Line, Sleeping Line
  u        Curves, Standing Line
  v        Diagonal Lines
  w        Multiple Diagonal Lines
  x        Diagonal Lines
  y        Diagonal Lines, Curve
  z        Sleeping Lines, Diagonal Line

## 5. Uppercase handwriting requirements

Implement a separate set of 26 uppercase letter geometries:

`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`

Uppercase letters must not be produced by simply enlarging lowercase
letters. Define their own proportions, stroke paths, and target
positions.

The uppercase section should reuse the same interaction engine and
pattern library wherever appropriate.

### Illustrative uppercase pattern mapping

This is an initial instructional breakdown. Final stroke geometry and
segmentation must be defined and reviewed for each letter.

  Letter   Initial pattern description
  -------- -------------------------------------
  A        Diagonal Lines, Sleeping Line
  B        Standing Line, Curves
  C        Curve
  D        Standing Line, Curve
  E        Standing Line, Sleeping Lines
  F        Standing Line, Sleeping Lines
  G        Curve, Sleeping Line
  H        Standing Lines, Sleeping Line
  I        Standing Line, Sleeping Lines
  J        Standing Line, Curve
  K        Standing Line, Diagonal Lines
  L        Standing Line, Sleeping Line
  M        Standing Lines, Diagonal Lines
  N        Standing Lines, Diagonal Line
  O        Curve
  P        Standing Line, Curve
  Q        Curve, Diagonal Line
  R        Standing Line, Curve, Diagonal Line
  S        Curves
  T        Sleeping Line, Standing Line
  U        Curves, Standing Lines
  V        Diagonal Lines
  W        Multiple Diagonal Lines
  X        Diagonal Lines
  Y        Diagonal Lines, Standing Line
  Z        Sleeping Lines, Diagonal Line

A separate uppercase worksheet reference may be supplied later. If so,
use it as the authoritative source for uppercase glyph shapes.
Otherwise, choose a consistent age-appropriate handwriting style and
document that choice.

## 6. SVG-based letter and pattern system

Use SVG as the primary rendering technology for letters, strokes, and
targets.

SVG is recommended because it provides precise control over:

-   Letter outlines.
-   Dotted stroke appearance.
-   Individual stroke paths.
-   Pattern positioning.
-   Scaling across screen sizes.
-   Colour transitions.
-   Hit-testing and target geometry.

### 6.1 Letter construction

For every letter, define:

1.  The complete dotted reference outline.
2.  Individual stroke paths.
3.  Pattern names associated with each stroke.
4.  Target coordinates or target regions.
5.  The correct orientation and scale.
6.  The completion state of each stroke.

The full dotted letter should remain visible as the reference. As the
student correctly places each piece, the corresponding part of the
outline should change to green.

### 6.2 Suggested TypeScript data model

``` ts
interface Stroke {
  id: string;
  patternName: string;
  path: string;
  targetPath: string;
  startPoint: [number, number];
  endPoint: [number, number];
}

interface LetterData {
  character: string;
  caseType: "lowercase" | "uppercase";
  referencePath: string;
  strokes: Stroke[];
}
```

The model can be expanded with properties such as `targetId`,
`rotation`, `scale`, `hintPath`, `order`, and `accessibleLabel` as
implementation needs become clear.

### 6.3 Pattern library

Create reusable SVG components for the pattern types. Each component
should support:

-   Dragging.
-   Scaling.
-   Rotation when appropriate.
-   Snapping.
-   Colour changes.
-   Mouse and touch interaction.
-   An accessible name.

The pattern tray should be generated from the selected letter's data
rather than hard-coded separately for every page.

## 7. Drag-and-drop and automatic snapping

This is the central interaction feature.

### 7.1 Expected student experience

1.  The student opens a letter exercise.
2.  The dotted outline appears in the workspace.
3.  The selection panel shows the patterns required for that letter.
4.  The student selects a pattern and drags it towards the matching part
    of the letter.
5.  The application checks the dragged piece's identity and position
    against the target.
6.  When it is close enough to the correct target, the piece snaps into
    its exact position.
7.  The completed stroke changes to green.
8.  A positive sound or visual cue confirms success.
9.  The student repeats the process for the remaining strokes.
10. When all required strokes are completed, the application displays a
    celebration and enables the next letter.

### 7.2 Distance calculation

A basic distance calculation can be used to determine whether a dragged
piece is near its target:

\[ d = `\sqrt{(x_t-x_d)^2+(y_t-y_d)^2}`{=tex} \]

Where:

-   `x_t, y_t` are the target coordinates.
-   `x_d, y_d` are the dragged piece coordinates.
-   `d` is the distance between them.

Start with a snapping threshold of approximately 25--35 CSS pixels, then
tune it through usability testing. The threshold should adapt to the
rendered workspace size so that snapping remains usable on tablets and
phones.

### 7.3 Validation rules

Distance alone must never determine success.

Before snapping, validate:

-   The dragged piece has the correct pattern ID or type.
-   It is being placed in the matching target.
-   It is within the allowed position and orientation tolerance.
-   The target is not already occupied.
-   The stroke has not already been completed.
-   Any required order rules are satisfied, if the exercise uses ordered
    strokes.

An incorrect piece must not turn green merely because it is near a
target.

### 7.4 Visual states

  State                 Suggested appearance
  --------------------- ----------------------------------------
  Available pattern     Neutral pattern colour
  Dragging              Blue highlight
  Correctly placed      Green
  Incorrect placement   Return to tray or show gentle feedback
  Uncompleted outline   Dotted grey or black
  Completed letter      Green strokes with celebration

Use child-friendly, non-punitive feedback. Avoid harsh error sounds or
alarming red screens.

### 7.5 Pointer and touch support

Use the Pointer Events API so the same interaction logic supports mouse,
stylus, and touch. Ensure that dragging does not accidentally scroll the
page while a student is moving a pattern. Provide sufficiently large
touch targets and test on actual mobile devices.

## 8. Navigation and progress

Every practice page must provide:

-   **Previous:** Move to the preceding letter.
-   **Next:** Move to the following letter.
-   **Reset:** Restore the current exercise to its initial state.
-   **Home:** Return to the main page.
-   **Alphabet selector:** Jump to any letter.
-   **Progress indicator:** Show progress such as 8/26.
-   **Completion indicator:** Visually distinguish completed letters.

Expected navigation:

`a → b → c → d → ... → z`

Apply the same behaviour to uppercase letters.

At the first letter, disable Previous or provide a clear route back to
the alphabet selector. At the final letter, disable Next or provide an
explicit completion action. Do not silently wrap from the last letter to
the first.

## 9. Recommended technology stack

  Technology           Responsibility
  -------------------- ----------------------------------------------
  React                User interface and reusable components
  TypeScript           Typed letter, stroke, and interaction data
  Vite                 Development server and production build
  Tailwind CSS         Responsive styling
  SVG                  Dotted letter geometry, strokes, and targets
  Pointer Events API   Mouse, stylus, and touchscreen dragging
  Framer Motion        UI and completion animations
  LocalStorage         Save learning progress locally
  Web Audio API        Optional sound feedback

A backend is not required for the first version. The initial application
can run entirely in the browser, with letter data stored locally in
TypeScript or JSON files.

## 10. Proposed project structure

``` text
alphabet-learning/
│
├── public/
│   ├── sounds/
│   │   ├── correct.mp3
│   │   └── complete.mp3
│   └── illustrations/
│
├── src/
│   ├── components/
│   │   ├── HomePage.tsx
│   │   ├── AlphabetGrid.tsx
│   │   ├── PracticeWorkspace.tsx
│   │   ├── AlphabetSVG.tsx
│   │   ├── PatternTray.tsx
│   │   ├── DraggableStroke.tsx
│   │   ├── DropTarget.tsx
│   │   ├── Navigation.tsx
│   │   └── CompletionModal.tsx
│   │
│   ├── data/
│   │   ├── lowercase.ts
│   │   ├── uppercase.ts
│   │   └── patterns.ts
│   │
│   ├── hooks/
│   │   ├── useDragAndDrop.ts
│   │   └── useProgress.ts
│   │
│   ├── utils/
│   │   ├── snapping.ts
│   │   └── alphabetProgress.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
└── package.json
```

## 11. Suggested component responsibilities

  -----------------------------------------------------------------------
  Component                           Responsibility
  ----------------------------------- -----------------------------------
  `HomePage`                          Displays the two main choices

  `AlphabetGrid`                      Displays and selects the 26 letters

  `PracticeWorkspace`                 Coordinates the current letter
                                      exercise

  `AlphabetSVG`                       Renders the dotted reference
                                      outline and stroke states

  `PatternTray`                       Displays the required named
                                      patterns

  `DraggableStroke`                   Implements an individual draggable
                                      pattern

  `DropTarget`                        Represents and validates a target
                                      stroke

  `Navigation`                        Previous, Next, Reset, and Home
                                      controls

  `CompletionModal`                   Celebrates completion and offers
                                      the next step
  -----------------------------------------------------------------------

## 12. Progress persistence

Use LocalStorage for the first release.

Store information such as:

-   Completed lowercase letters.
-   Completed uppercase letters.
-   Current letter selection.
-   Exercise completion state.

Example data structure:

``` ts
interface LearningProgress {
  lowercaseCompleted: string[];
  uppercaseCompleted: string[];
  lastSelectedCase: "lowercase" | "uppercase";
  lastSelectedLetter: string;
}
```

Progress should survive a page refresh. Provide a way to reset progress
if needed. Do not store personal student information unless it is
genuinely required.

## 13. Additional educational features

These features can be added after the core interaction works.

  -----------------------------------------------------------------------
  Feature                             Behaviour
  ----------------------------------- -----------------------------------
  Letter pronunciation                Play the selected letter's
                                      pronunciation

  Correct-placement sound             Play a soft positive sound

  Completion animation                Celebrate a fully completed letter

  Pattern hints                       Highlight the next correct target

  Hint mode                           Show placement guidance

  Challenge mode                      Hide placement guidance

  Reset                               Restart the current exercise

  Progress tracking                   Remember completed letters

  Responsive layout                   Support desktop, tablet, and mobile

  Accessibility                       Keyboard alternatives, clear
                                      labels, and adequate contrast
  -----------------------------------------------------------------------

Keep the initial interface simple. Avoid overwhelming young learners
with too many buttons or instructions.

## 14. Development roadmap

Build the application in the following order.

  -----------------------------------------------------------------------
  Phase                   Work                    Deliverable
  ----------------------- ----------------------- -----------------------
  1                       Home page and           Functional landing page
                          navigation              

  2                       Reusable SVG pattern    Named, draggable
                          library                 pattern components

  3                       Dotted lowercase        Accurate lowercase
                          geometry                reference glyphs

  4                       Drag-and-drop engine    Working pattern
                                                  movement

  5                       Snapping and validation Correct placement and
                                                  green feedback

  6                       Lowercase A--Z          All 26 lowercase
                                                  exercises

  7                       Uppercase A--Z          All 26 uppercase
                                                  exercises

  8                       Progress and animations Completion tracking and
                                                  feedback

  9                       Responsive design       Desktop, tablet, and
                                                  mobile support

  10                      Testing and deployment  Production-ready
                                                  website
  -----------------------------------------------------------------------

### Phase 1 --- Home page

-   Create the landing page.
-   Add the two large alphabet choices.
-   Add responsive navigation.
-   Establish the visual theme.

### Phase 2 --- Pattern library

-   Build reusable SVG pattern components.
-   Add clear pattern names.
-   Support dragging, scaling, and orientation.
-   Ensure patterns work with mouse and touch.

### Phase 3 --- Lowercase reference geometry

-   Prepare all 26 lowercase glyphs.
-   Match the supplied worksheet's shapes.
-   Ensure `a` and `g` are single-storey.
-   Generate evenly spaced dots.
-   Define individual stroke paths and target regions.
-   Review every glyph against the reference.

### Phase 4 --- Interaction engine

-   Implement pointer-based dragging.
-   Calculate target proximity.
-   Validate pattern identity and target identity.
-   Implement snapping and green feedback.
-   Prevent duplicate placement.
-   Add reset behaviour.

### Phase 5 --- Complete lowercase alphabet

-   Add all 26 letter configurations.
-   Test each letter's pattern tray.
-   Verify all target positions.
-   Test navigation and completion.

### Phase 6 --- Uppercase alphabet

-   Prepare a separate uppercase geometry library.
-   Reuse the same practice engine.
-   Test all 26 uppercase exercises.

### Phase 7 --- Final polish

-   Add sound and animation.
-   Implement LocalStorage progress.
-   Add hints and challenge mode.
-   Improve mobile usability and accessibility.
-   Test the complete learning flow.

## 15. Testing and acceptance checklist

The website is ready for its first release when the following checks
pass:

-   [ ] All 26 lowercase letters match the reference handwriting style.
-   [ ] All 26 uppercase letters have individually defined geometry.
-   [ ] Lowercase `a` and `g` use single-storey handwriting forms.
-   [ ] Dotted outlines are clear and evenly spaced.
-   [ ] Each letter displays its correct required patterns.
-   [ ] Pattern names are visible.
-   [ ] Dragging works with a mouse.
-   [ ] Dragging works on touchscreens.
-   [ ] Correct patterns snap automatically.
-   [ ] Incorrect patterns cannot turn green.
-   [ ] Completed patterns remain fixed.
-   [ ] The entire letter shows completion feedback.
-   [ ] Previous and Next navigation work.
-   [ ] Reset restores the initial exercise.
-   [ ] Home returns to the landing page.
-   [ ] Progress is saved after refreshing.
-   [ ] The interface works on desktop, tablet, and mobile.
-   [ ] All 52 letters have been individually tested.

## 16. Important implementation rules

Treat the following as permanent project requirements:

1.  The supplied lowercase worksheet is the authoritative visual
    reference.
2.  Preserve its dotted handwriting appearance and individual letter
    shapes.
3.  Never replace the reference glyphs with ordinary lowercase
    typography.
4.  Use single-storey lowercase `a` and `g`.
5.  Implement all 26 lowercase letters individually.
6.  Define uppercase geometry separately.
7.  Preserve the draggable pattern selection panel and pattern names.
8.  Implement accurate target validation and automatic snapping.
9.  Correctly placed strokes must turn green.
10. Use one reusable practice engine for all 52 letters.
11. Include Previous, Next, Reset, and Home navigation.
12. Make the website intuitive for young children.
13. Support mouse and touchscreen interactions.
14. Do not mark a stroke correct based only on distance; validate its
    pattern identity and target.
15. Keep the first release frontend-only unless a backend requirement
    emerges.

## 17. Recommended first prototype

Do not begin by implementing all 52 letters.

Start with one fully functional lowercase `a`.

The prototype must demonstrate:

-   The correct single-storey dotted `a` shape from the reference.
-   A Curve pattern and a Standing Line pattern.
-   Clearly named pattern pieces.
-   Drag-and-drop interaction.
-   Correct target detection.
-   Automatic snapping.
-   Green colour transition.
-   Completion feedback.
-   Reset functionality.
-   Navigation to the next letter.

Once this prototype works reliably, reuse the same engine to implement
the remaining 25 lowercase letters and 26 uppercase letters.

This approach reduces duplicated code and makes it much easier to refine
the interaction before scaling the application.

## 18. Open design decision

The lowercase worksheet has been supplied and should be used as the
exact visual reference.

A separate uppercase worksheet reference has not yet been established.
If one is supplied, use it as the authoritative uppercase reference.
Otherwise, select a consistent age-appropriate uppercase handwriting
style and create the uppercase SVG library independently.

------------------------------------------------------------------------

**Project outcome:** A responsive, child-friendly interactive alphabet
learning website with 52 individually defined dotted letters, reusable
draggable handwriting patterns, automatic snapping, green completion
feedback, navigation, and saved learning progress.
