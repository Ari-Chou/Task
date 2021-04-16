
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
  state = {
    redirectTpAddCoursePage: false,
  };

  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert(error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {});
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.redirectTpAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectTpAddCoursePage: true })}
        > ADD Course</button>
        <CourseList courses={this.props.courses} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(a => a.id === course.authorId).name
            }
        }),
        authors: state.authors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: { 
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
       }
    }
}

// const mapDispatchToProps = { // when declared as an object, each property is automatically bound to dispatch.
//     createCourse: courseActions.createCourse
// }


export default connect(mapStateToProps, mapDispatchToProps) (CoursesPage);