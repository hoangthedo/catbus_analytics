import I18n from 'i18n!analysis_report.components'
import React from 'react'
import {View} from '@instructure/ui-layout'
import PropTypes from 'prop-types'

export default class QuestionBankTable extends React.Component {
    static propTypes = {
        banks: PropTypes.arrayOf(PropTypes.object)
    }

    renderHeadTable = () => {
        return (
            <thead>
                <tr>
                    <th style={paddingLeft}>{I18n.t('question_bank_table.name', "Name")}</th>
                    <th>{I18n.t('question_bank_table.position', 'Position')}</th>
                    <th>{I18n.t('question_bank_table.course_name', 'Course name')}</th>
                    <th style={centerAlign}>{I18n.t('question_bank_table.questions', 'Quesions')}</th>
                </tr>
            </thead>
        )
    }

    renderBodyTable = () => {
        return (
            <tbody>
                {this.props.banks.map((bank) => {
                    return this.renderRowTable(bank)
                })}
            </tbody>
        )
    }

    renderRowTable = (bank) => {
        return (
            <tr>
                <td style={paddingLeft}>{bank.title}</td>
                <td>{typeof bank.course_name === 'undefined'? I18n.t('question_bank_table.account', 'Account') : I18n.t('question_bank_table.course', 'Course')}</td>
                <td>{bank.course_name}</td>
                <td style={centerAlign}>{bank.questions_length}</td>
            </tr>
        )
    }

    render() {
        return (
            <View margin="0 large">
                <div style={reponsive}>
                    <h3 style={title}>{I18n.t('question_bank_table.question_bank_list', 'Question banks')}</h3>
                    {this.props.banks.length > 0 ?
                        <table
                        className="ic-Table ic-Table--striped"
                        >
                            {this.renderHeadTable()} 
                            {this.renderBodyTable()}
                        </table>
                    : <div style={centerAlign}>{I18n.t('question_bank_table.empty', 'Empty')}</div>
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

const paddingLeft = {
    paddingLeft: '50px'
}