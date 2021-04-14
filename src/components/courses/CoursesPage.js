import { func } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                title: ""
            }
        };
    }

    handleChange = (event) => { //Arrow function inherit the binding context of their enclosing scope.
        const course = { ...this.state.course, title: event.target.value }
        this.setState({ course: course })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.actions.createCourse(this.state.course)
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Courses</h3>
                <input type="text" onChange={this.handleChange} value={this.state.course.title} />
                <input type="submit" value="Save" />
                {this.props.courses.map((course) => (
                    <div key={course.title}>{ course.title}</div>
                ))}
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

// const mapDispatchToProps = { // when declared as an object, each property is automatically bound to dispatch.
//     createCourse: courseActions.createCourse
// }


export default connect(mapStateToProps, mapDispatchToProps) (CoursesPage);