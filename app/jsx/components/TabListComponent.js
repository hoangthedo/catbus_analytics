import I18n from 'i18n!analysis_report.components'
import React from 'react'
import TabList, {TabPanel} from '@instructure/ui-tabs/lib/components/TabList'
import DetailedReport from '../page_view/DetailedReport'

export default class TabListComponent extends React.Component {
    onTabChanged = (newIndex, oldIndex) => {
        if (newIndex === oldIndex) return
    }
    
    render() {
        return (
          <div className="">
            <TabList onChange={this.onTabChanged}>
              <TabPanel title={I18n.t('tab_list.general_report', 'General report')}>
              </TabPanel>
              <TabPanel title={I18n.t('tab_list.detailed_report', 'Detailed report')}>
                <DetailedReport/>
              </TabPanel>
              <TabPanel title={I18n.t('tab_list.chart', 'Chart')}>
              </TabPanel>
            </TabList>
          </div>
        )
      }
}