# styledsyntax-web

A simple code parser to migrate from object based css (React/MUI):

```javascript
display: "flex",
flexWrap: "nowrap",
flexGrow: 1,
maxWidth: 315,
marginRight: theme.spacing(4, 2),
customClassName: {
  borderBottom: "1px solid black"
}
```

to normal css, which can be adopted by Styled Components:

```css
display: flex;
flex-wrap: nowrap;
flex-grow: 1,
max-width: 315,
margin-right: \${({ theme }) => theme.spacing(4, 2)};
.custom-class-name {
  border-bottom: 1px solid black;
}
```

Supports theming

Doesnt support units (add this yourself if missing; its in the backlog)
