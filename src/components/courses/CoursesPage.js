import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import CourseList from './CourseList'

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

    /*state = {
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

    }*/

    componentDidMount() {
        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading courses failed" + error);
            })
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            })
        }
    }

    render() {
        return (
            /*<form onSubmit={this.handleSubmit}>
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
            </form>*/
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
                {/* {this.props.courses.map(course => (
                    <div key={course.title}>{course.title}</div>
                ))} */}
            </>
        )
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    //dispatch: PropTypes.func.isRequired
    //createCourse: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    //debugger;
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            }
        }),
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // Manual Mapping
        //createCourse: course => dispatch(courseActions.createCourse(course))

        // Bind Action Creators
        //actions: bindActionCreators(courseActions, dispatch)
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);