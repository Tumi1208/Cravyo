Design asset rule:
- PNG/JPG files may contain a fake status bar or fake top bar.
- Those top areas are reference only.
- Do not render them as actual app UI.
- Use the real device status bar and safe area.
- Match top background color from the design.
- Crop or offset image content so duplicated top bars do not appear.
- If a screen has Skip or other top actions, render them once only as real interactive app elements.