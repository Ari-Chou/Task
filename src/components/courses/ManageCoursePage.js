
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import CourseForm from './CourseForm';
import { newCourse } from '../../../Tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export function ManageCoursePage({ courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props}) {
    
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false)

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
        event.preventDefault();
        setSaving(true);
        saveCourse(course)
            .then(() => {
            toast.success("Course Saved.")
          history.push("/courses");
            }).catch(error => {
                setSaving(false)
                setErrors({onSave: error.message})
        })
    }
    
    // render the course form page
    return authors.length === 0 || courses.length === 0 ? (
      <Spinner />
    ) : (
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    ); 
}

// redux
export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
}
  
function mapStateToProps(state, ownProps) { // this let us access the component's props. we can use this to read the URL date injected on props by react router
    const slug = ownProps.match.params.slug;
    console.log(slug)
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
    console.log(".....",course)
    return {
        course: course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadAuthors,
    loadCourses,
    saveCourse
}


export default connect(mapStateToProps, mapDispatchToProps) (ManageCoursePage);