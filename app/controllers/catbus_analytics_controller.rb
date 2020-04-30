class CatbusAnalyticsController < ApplicationController
    include Api::V1::Account
    include Api::V1::CatbusAnalytics
    include SearchHelper
    before_action :require_context
    before_action :require_user
    before_action :get_accounts, only: [:index, :accounts]
    
    def index
        @account_json = account_json(@account, @current_user, session, ['html_url'])
        @total_pages = @accounts.paginate(page: 1, per_page: 20).total_pages
    end

    def accounts
        root_accounts = @accounts.paginate(page: params[:page], per_page: 20)
        total_pages = root_accounts.total_pages
        root_accounts = root_accounts.collect{ |account| root_account_json(account, @current_user, session)}
        
        render json: {accounts: root_accounts, total_pages: total_pages}
    end

    def show
        account_scope = Account.active
        account = api_find(account_scope, params[:root_account_id])
        render json: root_account_json(account, @current_user, session, true)
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
            
            if params[:search].present?
                @accounts = search(@accounts, params[:search])
            end
        end

        def search(accounts, keyword)
            accounts = accounts.select {|acc| search_email(acc.users, keyword[:email]) and search_domain(acc, keyword[:domain]) and search_school_name(acc, keyword[:school_name]) and search_account_id(acc, keyword[:account_id])}
            accounts
        end
    
        def search_email(users, keyword)
            return true unless keyword.present?
            return true if users.nil?
            users = users.select{|usr| usr.email.include?(keyword)} 
            users.length > 0
        end

        def search_domain(account, keyword)
            return true unless keyword.present?
            domain = account.catbus_account_domains.select{|acc| acc.host.include?(keyword)}
            domain.length > 0
        end

        def search_account_id(account, keyword)
            return true if !keyword.present?
            account.id.to_s == keyword
        end

        def search_school_name(account, keyword)
            return true if !keyword.present?
            account.name.include?(keyword)
        end
end