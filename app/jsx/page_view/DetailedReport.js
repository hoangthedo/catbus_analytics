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

    renderSearch = () => {
        return (
        <View display="block">
          <TextInput
            label={<ScreenReaderContent>{I18n.t('search_input.placeholder','Search by email')}</ScreenReaderContent>}
            placeholder={I18n.t('search_input.placeholder','Search by email')}
            icon={() => (
              <span disabled>
                <IconSearchLine focusable={false} />
              </span>
            )}
            onChange={this.onSearchStringChange}
            name="email_search"
          />
          <h6>{I18n.t('search_advanced.name', 'Search Advanced: ')}<a  onClick={this.changeSearchAdvanced} style={styleA}>{this.state.searchStateText}</a></h6>
          {this.state.showSearchAdvanced ? this.renderAdvanceSearch() : null}
        </View>
      )
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
                                name="domain_search"
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
                                name="account_id_search"
                            />
                        </GridCol>
                    </GridRow>
                    <GridRow vAlign="middle">
                        <GridCol width={3} textAlign="end">
                        </GridCol>
                        <GridCol width={4}>
                            <Button variant="primary">{I18n.t('seach', "Search")}
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
                <RootAccountTable/>
            </View>
        )
    }
}

const styleA = {
    textDecoration: 'none', 
    cursor: 'pointer'
}