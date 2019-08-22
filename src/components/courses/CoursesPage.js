import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import CourseList from './CourseList'
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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

    state = {
        redirectToAddCoursePage: false
    };

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
            });
        }
    }

    handleDeleteCourse = async course => {
        toast.success("Course deleted");
        // this.props.actions.deleteCourse(course).catch(error => {
        //     toast.error("Delete failed. " + error.message, { autoClose: false });
        // });
        try {
            await this.props.actions.deleteCourse(course);
        } catch (error) {
            toast.error("Delete failed. " + error.message, { autoClose: false });
        }
    };

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
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading ?
                    <Spinner /> : (
                        <>
                            <button
                                style={{ marginBottom: 20 }}
                                className="btn btn-primary add-course"
                                onClick={() => this.setState({ redirectToAddCoursePage: true })}>
                                Add Course
                            </button>
                            <CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
                        </>
                    )}
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
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    //debugger;
    // return {
    //     courses: state.courses
    // };
    return {
        courses:
            state.authors.length === 0
                ? []
                : state.courses.map(course => {
                    return {
                        ...course,
                        authorName: state.authors.find(a => a.id === course.authorId).name
                    };
                }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // Manual Mapping
        //createCourse: course => dispatch(courseActions.createCourse(course))

        // Bind Action Creators
        // actions: bindActionCreators(courseActions, dispatch)
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);