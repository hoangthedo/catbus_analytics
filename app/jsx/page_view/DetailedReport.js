import I18n from 'i18n!analysis_report.components.detailed_report'
import React from 'react'
import {View} from '@instructure/ui-layout'
import IconSearchLine from '@instructure/ui-icons/lib/Line/IconSearch'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import TextInput from '@instructure/ui-forms/lib/components/TextInput'
import Grid, {GridCol, GridRow} from '@instructure/ui-layout/lib/components/Grid'
import RootAccountTable from '../components/RootAccountTable'
import Button from '@instructure/ui-buttons/lib/components/Button'

export default class DetailedReport extends React.Component {
    state = {
        reportTypes: ENV.ANALYTICS.REPORT_TYPE,
        showSearchAdvanced: false,
        searchStateText: I18n.t('search_input.search_advanced.show', 'Show'),
        search: {},
        search_email: "",
        search_domain: "",
        search_account_id: "",
        search_school_name: "",
        is_enter: false
    }

    changeSearchAdvanced = () => {
        if (this.state.showSearchAdvanced){
            this.setState({
                showSearchAdvanced: false,
                searchStateText: I18n.t('search_input.search_advanced.show', 'Show')
            })
        } else {
            this.setState({
                showSearchAdvanced: true,
                searchStateText: I18n.t('search_input.search_advanced.hide', 'Hide')
            })
        }
    }

    handleSearch = () => {
        
    }

    renderSearch = () => {
        return (
        <View display="block">
          <TextInput
            type="search"
            label={<ScreenReaderContent>{I18n.t('search_input.placeholder','Search by email')}</ScreenReaderContent>}
            placeholder={I18n.t('search_input.placeholder','Search by email')}
            onChange={e => this.handleSearchAdvanced('email', e.target.value)}
            onKeyUp={e => {
                if (e.key === 'Enter') {
                    this.setState({is_enter: true})
                }
            }}
            />
          <h6>{I18n.t('search_input.search_advanced.name', 'Search Advanced')}: <a onClick={this.changeSearchAdvanced} className="styleA">{this.state.searchStateText}</a></h6>
          {this.state.showSearchAdvanced ? this.renderAdvanceSearch() : null}
        </View>
      )
    }

    handleSearchAdvanced = (key, value) => {
        let search = this.state.search
        search[key] = value
        this.setState({search, is_enter: false})
    }

    renderAdvanceSearch = () => {
        return (
            <View display="block">
               <Grid rowSpacing="small">
                    <GridRow vAlign="middle">
                        <GridCol width={3} textAlign="end">
                            <h6>{I18n.t('search_input.search_advanced.domain', 'Domain')}</h6>
                        </GridCol>
                        <GridCol width={4}>
                            <TextInput
                                onChange={this.onSearchStringChange}
                                label={<ScreenReaderContent>{I18n.t('Search')}</ScreenReaderContent>}
                                name="domain_search"
                                onChange={e => this.handleSearchAdvanced('domain', e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === 'Enter') {
                                        this.setState({is_enter: true})
                                    }
                                }}
                            />
                        </GridCol>
                    </GridRow>
                    <GridRow vAlign="middle">
                        <GridCol width={3} textAlign="end">
                            <h6>{I18n.t('search_input.search_advanced.account_id', 'Account ID')}</h6>
                        </GridCol>
                        <GridCol width={4}>
                            <TextInput
                                onChange={this.onSearchStringChange}
                                label={<ScreenReaderContent>{I18n.t('Search')}</ScreenReaderContent>}
                                name="account_id_search"
                                onChange={e => this.handleSearchAdvanced('account_id', e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === 'Enter') {
                                        this.setState({is_enter: true})
                                    }
                                }}
                            />
                        </GridCol>
                    </GridRow>
                    <GridRow vAlign="middle">
                        <GridCol width={3} textAlign="end">
                            <h6>{I18n.t('search_input.search_advanced.school_name', 'School name')}</h6>
                        </GridCol>
                        <GridCol width={4}>
                            <TextInput
                                onChange={this.onSearchStringChange}
                                label={<ScreenReaderContent>{I18n.t('Search')}</ScreenReaderContent>}
                                name="school_name_search"
                                onChange={e => this.handleSearchAdvanced('school_name', e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === 'Enter') {
                                        this.setState({is_enter: true})
                                    }
                                }}
                            />
                        </GridCol>
                    </GridRow>
                    <GridRow vAlign="middle">
                        <GridCol width={3} textAlign="end">
                        </GridCol>
                        <GridCol width={4}>
                            <Button variant="primary" onClick={ e => {
                                this.setState({is_enter: true})
                            }}>{I18n.t('seach', "Search")}
                            </Button>
                        </GridCol>
                    </GridRow>
                </Grid>
            </View>
        )
    }

    render() {
        return (
            <View display="block">
                {this.renderSearch()}
                <RootAccountTable search={this.state.search} is_enter={this.state.is_enter}/>
            </View>
        )
    }
}