import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Auth', exact: false},
    {to: '/quiz/create', label: 'Create test', exact: false}
];

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClick}/> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;