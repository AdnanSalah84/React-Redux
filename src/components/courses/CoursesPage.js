import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
    // Simple Add Course Form
    /*constructor(props) {
        super(props);
        this.state = {
            course: {
                title: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }*/

    state = {
        course: {
            title: ''
        }
    };

    //handleChange(event) {
    handleChange = (event) => {
        const course = { ...this.state.course, title: event.target.value };
        this.setState({ course });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //debugger;
        //alert(this.state.course.title);
        //this.props.dispatch(courseActions.createCourse(this.state.course));
        //this.props.createCourse(this.state.course);
        this.props.actions.createCourse(this.state.course);

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.course.title}
                />

                <input type="submit" value="Save" />
                {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))}
            </form>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    //dispatch: PropTypes.func.isRequired
    //createCourse: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    //debugger;
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // Manual Mapping
        //createCourse: course => dispatch(courseActions.createCourse(course))

        // Bind Action Creators
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);