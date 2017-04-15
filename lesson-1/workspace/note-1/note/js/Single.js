/**
 * Created by admini161015 on 2017/4/9.
 */
import React from 'react';
class Single extends React.Component{
    constructor(...args) {
        super(...args);
        this.state={
            editing: false,
            selected: false
        }

    }
    static propTypes={
        content: React.PropTypes.string.isRequired,
        onRemove: React.PropTypes.func,
        selected: React.PropTypes.bool,
        onSelect: React.PropTypes.func,
        index: React.PropTypes.number
    };
    static  defaultProps={
            content: 'todo what?',
            selected: false
    };
    componentWillMount() {
        this.setState({content: this.props.content});

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.content != this.props.content) {
            this.setState({content: nextProps.content});
        }
    }
    _onUpdate(e) {
        this.setState({editing: true});
    }
    _cancelEditing(e) {
        this.setState({editing: false});
    }
    _onSave (e) {
        var input = this.refs.input;
        if (input.value.trim() == '') {
            alert('value is empty!');
        } else {
            this.setState({
                editing: false,
                content: input.value
            });
            var list = JSON.parse(window.localStorage.getItem("list"));
            list.map((x,i)=>{
                if(x.index==this.props.index) {
                list.splice(i,1,{"index":x.index,"content":input.value});//不能立即改变？
            }
        });
            window.localStorage.setItem("list", JSON.stringify(list, ["content", "index"]));
        }
    }

    render() {
        var editing = this.state.editing;
        if (this.props.hidden)
            return false;
        return (<div style={{display: "inline-block"}}>
        {!editing ? <span><input type="checkbox" checked={this.props.selected}
            onChange={this.props.onSelect}/>{this.state.content}</span> :
        <input type="text" ref="input" defaultValue={this.state.content}/>}
    <button onClick={!editing ? this._onUpdate.bind(this) : this._onSave.bind(this)}>{!editing ? 'Update' : 'Save'}</button>
        {editing && <button onClick={this._cancelEditing.bind(this)}>{'Cancel'}</button>}
    </div>)
    }
}
export default Single;
