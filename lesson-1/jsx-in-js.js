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
        this.setState({list: []});
    },
    _delete: function (e) {
        var list = this.state.list//.slice();
        list = list.filter(x => !x.selected);
        console.info(list);
        this.setState({list: list});
    },
    _select: function (i) {
        var list = this.state.list//.slice();
        list[i].selected = !list[i].selected;
        this.setState({list: list});
    },
    render: function () {
        var list = this.state.list;
        return (
            <div>
                <input type="search" onChange={(e) => {
                    var word = e.target.value.trim();
                    this.setState({
                        // x => {a: 2, v: []} {...x, h: 2} => { a: 2, v: [], h: 2} => Object.assign({}, x, {h: 2})
                        list: list.map(x => x.text.includes(word) ? Object.assign(x, {hidden: false}): Object.assign(x, {hidden: true}))
                    })
                }}/>
                {
                    list.map((x, i) =>
                        <Todo
                            hidden={x.hidden}
                            content={x.text}
                            key={i/*x?*/}
                            onRemove={() => {this._remove(i)}}
                            onSelect={() => this._select(i)}
                            selected={x.selected}
                        />
                    )
                }
                <input ref="input" />
                <button onClick={this._add}>Add</button>
                <button onClick={this._delete}>Delete</button>
                <button onClick={this._clear}>Clear</button>
            </div>
        )
    }
})

var Todo = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired,
        onRemove: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        selected: React.PropTypes.bool,
        hidden: React.PropTypes.bool,
    },
    shouldComponentUpdate: function (nextProps) {
        console.info(this.props, nextProps)
        // return this.props !== nextProps;
        return true;
    },
    getDefaultProps: function() {
        return {
            content: 'todo what?'
        };
    },
    getInitialState: function() {
        return {editing: false, selected: false, hidden: false};
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
        if (this.props.hidden) {
            return null;
        }
        return (
            <div>
                <input type="checkbox" checked={this.props.selected}
                       onChange={this.props.onSelect}
                />
                {!editing
                    ? <p>{this.state.content}</p>
                    : <input type="text" ref="input" defaultValue={this.state.content}/>}
                {this.props.onRemove && <button onClick={this.props.onRemove}>Delete</button>}
                <button onClick={!editing?this._onUpdate:this._onSave}>{!editing?'Update':'Save'}</button>
                {editing && <button onClick={this._cancelEditing}>{'Cancel'}</button>}
                <hr/>
            </div>
        )
    }
});

ReactDOM.render(
    <TodoList list={[{text: "abc"}, {text: "ABC"}]}/>,
    document.getElementById('app')
);