/**
 * Created by admini161015 on 2017/4/9.
 */
import React from 'react'
import Single from './Single'
var len = window.localStorage.getItem("len") ? window.localStorage.getItem("len") : 0;
class Note extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            list: window.localStorage.getItem("list") ? JSON.parse(window.localStorage.getItem("list")) : [],
            editing: true
        }
    }
    static defaultProps = {
        list: []
    };
    static propTypes = {
        list: React.PropTypes.array
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.props.list) {
            this.setState({list: nextProps.list});
        }
    }

    _save() {

        var list = this.state.list;
        var value = this.refs.note.value;
        if (value.trim() != '') {
            len++;
            window.localStorage.setItem("len", len);
            list.push({"index": len, "content": value});
            window.localStorage.setItem("list", JSON.stringify(list, ["content", "index"]));
            this.setState({list: list});
        }
    }

    _show() {
        var list = window.localStorage.getItem("list");
        list = list ? JSON.parse(list) : [];
        this.setState({editing: false,list:list});
    }

    _write() {
        this.setState({editing: true});
    }

    _delete() {
        var editing = this.state.editing;
        if (!editing) {
            var list = this.state.list;
            for (var i = 0; i < list.length; i++) {
                if (list[i].selected) {
                    list.splice(i--, 1);
                    window.localStorage.setItem("list", JSON.stringify(list, ["content", "index"]));
                }
            }
            this.setState({list: list});
        }
    }

    _select(i) {
        var list = this.state.list;
        list[i].selected = !list[i].selected;
        this.setState({list: list});
    }

    _search(e) {

        var list = this.state.list;
        var text = e.target.value.trim();
        list.map(function (x) {
            x.content.indexOf(text) >= 0 ? Object.assign(x, {hidden: false}) : Object.assign(x, {hidden: true})
        });
        this.setState({
            list: list
        });
    }

    render() {
        var editing = this.state.editing;
        var list = this.state.list;
        var self = this;
        return <div>
            {editing ? <textarea ref="note" id="input" cols="50" rows="20"></textarea> : <ul id="list">
                <input type="search" onChange={this._search}/>
                {list.map(function (x, i) {
                    return <li key={i}><Single content={x.content}
                                               onSelect={()=>self._select(i)}
                                               selected={x.selected}
                                               index={x.index}
                                               hidden={x.hidden}
                    /></li>
                })}</ul>}

            <div id="menu">
                <button onClick={this._write.bind(this)}>WriteNotes</button>
                <button onClick={this._save.bind(this)}>SaveNotes</button>
                <button onClick={this._show.bind(this)}>MyNotes</button>
                <button onClick={this._delete.bind(this)}>DeleteNotes</button>
            </div>

        </div>
    }
}
export default Note;