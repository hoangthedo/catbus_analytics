class CatbusAnalyticsController < ApplicationController
    include Api::V1::Account
    include Api::V1::CatbusAnalytics
    before_action :require_context
    before_action :require_user
    before_action :get_accounts, only: [:index, :accounts]
    
    def index
        @account_json = account_json(@account, @current_user, session, ['html_url'])
        @total_pages = @accounts.paginate(page: 1, per_page: 20).total_pages
    end

    def accounts
        root_accounts = @accounts.paginate(page: params[:page], per_page: 20)
        root_accounts = root_accounts.collect{ |account| root_account_json(account, @current_user, session)}
        render json: root_accounts
    end

    def show
        account_scope = Account.active
        account = api_find(account_scope, params[:root_account_id])
        render json: root_account_json(account, @current_user, session)
    end

    private
        def get_accounts
            account_scope = Account.active
            @account = api_find(account_scope, params[:account_id])
            if @account.site_admin?
                @accounts = Account.active.root_accounts.where.not(id: Account.site_admin.id).order("id ASC")
            else
                @accounts = Account.find(root_account_id: @account.id).active.order("id ASC")
            end
            @accounts = @accounts.select{|acc| acc.domain.present?}
        end
end