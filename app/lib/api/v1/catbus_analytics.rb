module Api::V1::CatbusAnalytics
    include Api::V1::Json
    def root_account_json(account, user, session, detail = false)
        json = account_json_report(account, user, session)
        if detail
            attributes = %w(id name parent_account_id root_account_id workflow_state uuid)
            json['question_banks'] = account.assessment_question_banks.collect{ |question_bank| question_bank_json(question_bank, user, session)}
            account.all_courses.active.order('id ASC').each do |course|
                json['question_banks'] = json['question_banks'].concat(course.assessment_question_banks.collect{ |question_bank| question_bank_json(question_bank, user, session)})
            end
            json['sub_accounts'] = Account.where(root_account_id: account.id).active.order('id ASC').collect{|acc| account_json_report(acc, user, session)}
        end
        json
    end

    private
        def account_json_report(account, user, session)
            attributes = %w(id name parent_account_id root_account_id workflow_state uuid)
            json = api_json(account, user, session, :only => attributes)
            json['users'] = account.users.map{|a| a.email}
            json['email'] = account.users.map{|a| a.email}
            json['domain'] = account.catbus_account_domains.map{ |domain| domain.host}
            json['courses'] = account.all_courses.active.order('id ASC').collect{|course| course_json(course, user, session)}
            date = I18n.l(account.created_at.localtime)
            json['created_at'] = date.remove(date.split(' ').pop())
            json
        end

        def course_json(course, user, session)
            attributes = %w(id name account_id root_account_id course_code workflow_state uuid)
            json = api_json(course, user, session, :only => attributes)
            json['modules'] = course.context_modules.collect {|m| context_module_json(m, user, session)}
            json['students'] = course.students.collect{|student| student_json(student, user, session)}
            json
        end

        def context_module_json(context_module, user, session)
            attributes = %w(id name workflow_state)
            json = api_json(context_module, user, session, :only => attributes)
            json['content_tags'] = context_module.content_tags.collect{ |tag| content_tag_json(tag, user, session)}
            json
        end

        def content_tag_json(content_tag, user, session)
            attributes = %w(id title content_id content_type context_module_id workflow_state)
            json = api_json(content_tag, user, session, :only => attributes)
            json
        end

        def student_json(student, user, session)
            attributes = %w(id name sortable_name workflow_state uuid)
            json = api_json(student, user, session, :only => attributes)
            json
        end

        def question_bank_json(question_bank, user, session)
            attributes = %w(id title context_id context_type workflow_state)
            json = api_json(question_bank, user, session, :only => attributes)
            json['questions_length'] = question_bank.assessment_questions.length
            if question_bank.context_type == 'Account'
                json['account_name'] = question_bank.account.name
            else
                json['course_name'] = question_bank.course.name
            end
            json
        end
end