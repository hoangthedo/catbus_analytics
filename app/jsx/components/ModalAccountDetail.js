import I18n from 'i18n!analysis_report.components'
import React from 'react'
import {View} from '@instructure/ui-layout'
import Modal, {
    ModalHeader,
    ModalBody,
    ModalFooter
  } from '@instructure/ui-overlays/lib/components/Modal'
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import CoursesTable from './CoursesTable'
import QuestionBankTable from './QuestionBankTable'
import SubAccountTable from './SubAccountTable'

export default class ModalAccountDetail extends React.Component {
    state = {
        open: false,
        account_id: 0,
        data: {}
    }

    handleButtonClick = () => {
        this.setState(function (state) {
          return { open: !state.open }
        })
    };

    handleFormSubmit = e => {
        e.preventDefault()
        console.log('form submitted')
        this.setState({ open: false })
    }

    renderCloseButton () {
        return (
        <CloseButton
            placement="end"
            offset="small"
            onClick={this.handleButtonClick}
            screenReaderLabel="Close"
        />
        )
    }

    render() {
        return (
            <Modal
                open={this.state.open}
                onSubmit={this.handleFormSubmit}
                size="large"
                label={I18n.t('modal_account_detail.label', 'Account details')}
            >
                <ModalHeader>
                {this.renderCloseButton()}
                <Heading>{I18n.t('modal_account_detail.label', 'Account details')}</Heading>
                </ModalHeader>
                <ModalBody>
                    <View>
                        <CoursesTable courses={this.state.data.courses}/>
                    </View>
                    <View>
                        <QuestionBankTable banks={this.state.data.question_banks}/>
                    </View>
                    <View>
                        <SubAccountTable sub_accounts={this.state.data.sub_accounts}/>
                    </View>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleButtonClick} margin="0 x-small 0 0">Close</Button>
                </ModalFooter>
            </Modal>
        )
      }
}