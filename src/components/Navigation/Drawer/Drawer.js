import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {
    renderLinks(links) {
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

        const links = [
            {to: '/', label: 'List', exact: true}
        ];

        if (this.props.isAuthenticated) {
           links.push({to: '/quiz/create', label: 'Create test', exact: false});
           links.push({to: '/logout', label: 'Log Out', exact: false})
        } else {
            links.push({to: '/auth', label: 'Auth', exact: false})
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClick}/> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;