var TodoList = React.createClass({
    propTypes: {
        list: React.PropTypes.array
    },
    getDefaultProps: function() {
        return {
            list: []
        };
    },
    getInitialState: function() {
        return {list: []};
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.list !== this.props.list) {
            this.setState({list: nextProps.list});
        }
    },
    componentWillMount() {
        this.setState({list: this.props.list});
    },
    _remove: function (index) {
        var list = this.state.list;
        list.splice(index, 1);
        this.setState({list: list});
    },
    _add: function (e) {
        var input = this.refs.input;
        if (input.value.trim() == '') {
            alert('value is empty!');
        } else {
            var list = this.state.list;
            list.push(input.value);
            this.setState({list: list});
        }
    },
    _clear: function (e) {
//            var list = this.state.list;
//            list.splice(0, list.length);
        this.setState({list: []});
    },
    render: function () {
        var list = this.state.list;
        return (
            <div>
                {
                    list.map((x, i) =>
                        <Todo content={x} key={i/*x?*/} onRemove={() => {this._remove(i)}}/>
                    )
                }
                <input ref="input" />
                <button onClick={this._add}>Add</button>
                <button onClick={this._clear}>Clear</button>
            </div>
        )
    }
})

var Todo = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired,
        onRemove:  React.PropTypes.func,
    },
    getDefaultProps: function() {
        return {
            content: 'todo what?'
        };
    },
    getInitialState: function() {
        return {editing: false};
    },
    componentWillMount() {
        this.setState({content: this.props.content});
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.content != this.props.content) {
            this.setState({content: nextProps.content});
        }
    },
    _onUpdate: function (e) {
        this.setState({editing: true})
    },
    _cancelEditing: function (e) {
        this.setState({editing: false});
    },
    _onSave: function (e) {
        var input = this.refs.input;
        if (input.value.trim() == '') {
            alert('value is empty!');
        } else {
            this.setState({
                editing: false,
                content: input.value
            });
        }
    },
    render: function () {
        var editing = this.state.editing;
        return (
            <div>
                <input type="ch"/>
                {!editing
                    ? <p>{this.state.content}</p>
                    : <input type="text" ref="input" defaultValue={this.state.content} defaultChecked/>}
                {this.props.onRemove && <button onClick={this.props.onRemove}>Delete</button>}
                <button onClick={!editing?this._onUpdate:this._onSave}>{!editing?'Update':'Save'}</button>
                {editing && <button onClick={this._cancelEditing}>{'Cancel'}</button>}
            </div>
        )
    }
});

ReactDOM.render(
    <TodoList list={["abc", "ABC"]}/>,
    document.getElementById('app')
);