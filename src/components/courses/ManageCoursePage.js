
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../Tools/mockData';

function ManageCoursePage({ courses,authors,loadAuthors,loadCourses,saveCourse,history,...props}) {
    
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    // load the db data to compare to the user input
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch(error => {
                alert(error)
            })
        } else {
            setCourse({...props.course})
        }
        
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert(error)
            })
        }
    }, [props.course])

    // handle the form page input
    function handleChange(event) {
        const { name, value } = event.target
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
        console.log(name, value)
        console.log(course)
    }

    // handle the save course process
    function handleSave(event) {
        event.preventDefault()
        saveCourse(course).then(() => {
            history.push('/courses')
        })
    }
    
    // render the course form page
    return (
        <div>
            <CourseForm course={course} authors={authors} errors={errors} onChange={handleChange} onSave={ handleSave }></CourseForm>
        </div>
    )
}

// redux
export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug || null)
}
function mapStateToProps(state, ownProps) { // this let us access the component's props. we can use this to read the URL date injected on props by react router
    const slug = ownProps.match.params.slug
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course: course,
        courses: state.courses,
        authors: state.authors
    }
}

const mapDispatchToProps = {
    loadAuthors,
    loadCourses,
    saveCourse
}


export default connect(mapStateToProps, mapDispatchToProps) (ManageCoursePage);