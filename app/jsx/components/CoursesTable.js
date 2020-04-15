import I18n from 'i18n!analysis_report.components'
import React from 'react'
import {View} from '@instructure/ui-layout'
import PropTypes from 'prop-types'

function getContenTags(modules) {
    let content_tags = []
    modules.forEach(element => {
        content_tags = content_tags.concat(element.content_tags)
    })
    return content_tags
}

export default class CoursesTable extends React.Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object)
    }

    renderHeadTable = () => {
        return (
            <thead>
                <tr>
                    <th style={centerAlign}>{I18n.t('courses_table.course_id', "ID")}</th>
                    <th>{I18n.t('courses_table.course_name', 'Course Name')}</th>
                    <th style={centerAlign}>{I18n.t('courses_table.modules', 'Modules')}</th>
                    <th style={centerAlign}>{I18n.t('courses_table.item', 'Items')}</th>
                    <th style={centerAlign}>{I18n.t('courses_table.students', 'Students')}</th>
                </tr>
            </thead>
        )
    }

    renderBodyTable = () => {
        return (
            <tbody>
                {this.props.courses.map((course) => {
                    return this.renderRowTable(course)
                })}
            </tbody>
        )
    }

    renderRowTable = (course) => {
        return (
            <tr>
                <td style={centerAlign}>{course.id}</td>
                <td>{course.name}</td>
                <td style={centerAlign}>{course.modules.length}</td>
                <td style={centerAlign}>{getContenTags(course.modules).length}</td>
                <td style={centerAlign}>{course.students.length}</td>
            </tr>
        )
    }

    render() {
        return (
            <View margin="0 large">
                <div style={reponsive}>
                    <h3 style={title}>{I18n.t('courses_table.course_list', 'Courses')}</h3>
                    {this.props.courses.length > 0 ?
                        <table
                        className="ic-Table ic-Table--striped"
                        >
                            {this.renderHeadTable()} 
                            {this.renderBodyTable()}
                        </table>
                    : <div style={centerAlign}>{I18n.t('courses_table.empty', 'Empty')}</div>
                    }
                </div>
            </View>
        )
      }
}

const centerAlign = {
    textAlign: 'center'
}

const reponsive = {
    width: '100%',
    overflowX: 'auto',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)'
}

const title = {
    margin: '10px 30px'
}