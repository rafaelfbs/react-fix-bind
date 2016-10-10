# @fixBind

Fix React autobind of legacy components in es6 class components

## Usage

```javascript
// Legacy React component
const LegacyComponent = React.createClass({
  boundMethod: function() {
    return this.props.a
  }
})

// Extending a legacy react component is a bit tricky because
// React adds all methods in createClass definition in "this"
// scope. So you can't access prototype methods (instance has
// precedence over prototype)
export class ExtendedLegacyComponent extends LegacyComponent {
  constructor (props, context, updater) {
    super(props, context, updater)
    // You must call fixBind in constructor to remove bound methods
    // that React adds using AutoBind
    fixBind(this)
  }

  @fixBind
  boundMethod () {
    // Now this function will be called
    // calling super method is valid
    return super.boundMethod() + this.props.b
  }
}
```
