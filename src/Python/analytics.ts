const pythonCode = `
    import js
    import pandas as pd
    import json
    from datetime import datetime, timedelta
    import numpy as np

    file = js.localStorage.getItem('csv')
    from io import StringIO

    res = ""

    stream = StringIO(file)
    try:
        df = pd.read_csv(stream)

        schema = [
            'Date',
            'Company',
            'Type',
            'Role',
            'Role Type',
            'Country',
            'City',
            'State',
            'Referral',
            'Applied',
            'Total Interviews',
            'Total Interviewing Time',
            'S Date',
            'Passed (S)',
            'Rejected (S)',
            'On Hold (S)',
            'Ghosted 2w (S)',
            'Ghosted 4w (S)',
            'C Date',
            'Passed (C)',
            'On Hold (C)',
            'Ghosted (C)',
            'Rejected (C)',
            '1R Date',
            'Passed (1R)',
            'On Hold (1R)',
            'Ghosted (1R)',
            'Rejected (1R)',
            'FR Date',
            'Offer',
            'Rejected (O)',
            'On Hold (O)',
            'Ghosted (O)',
            'D Date',
            'Link',
            'Job ID'
        ]
        
        def checkIfSchemaMatch(df):
            cols = list(df.columns)
            print(cols)
            if len(cols) < len(schema):
                return False
            return all(map(lambda x: x[0] == x[1], zip(cols, schema)))
        
        if not checkIfSchemaMatch(df):
            print("Not Match")
            res = "Invalid file"
        else:

            df["Date"] =  pd.to_datetime(df["Date"], format="%d/%m/%Y")
            df["S Date"] =  pd.to_datetime(df["S Date"], format="%d/%m/%Y")
            df["C Date"] =  pd.to_datetime(df["C Date"], format="%d/%m/%Y")
            df["1R Date"] =  pd.to_datetime(df["1R Date"], format="%d/%m/%Y")
            df["FR Date"] =  pd.to_datetime(df["FR Date"], format="%d/%m/%Y")
            df["D Date"] =  pd.to_datetime(df["D Date"], format="%d/%m/%Y")

            counts = df.loc[df['Applied'] == "X"].count()

            metrics = {
                # Overall Metrics
                "jobs_applied": 0,
                "leads": 0,
                "first_rounds": 0,
                "final_rounds": 0,
                "offers": 0,
            
                # Relative Metrics
                "percentage_leads": 0,
                "percentage_first_rounds": 0,
                "percentage_final_rounds": 0,
                "percentage_offers": 0,
            
                # Interview Metrics
                "total_interviews": 0,
                "total_interviewing_time": 0,
                "avg_total_interviews": 0,
                "avg_total_interviewing_time": 0,
                "time_to_screen": 0,
                "time_to_first_round": 0,
                "time_to_final_round": 0,
                "time_to_offer": 0,
            
            
                # Time Series
                "time_series": {
                    "jobs_applied": [],
                    "leads": [],
                    "recruiter_chats": [],
                    "first_rounds": [],
                    "final_rounds": [],
                    "offers": []
                },
            
                "time_series_cummulative": {
                    "jobs_applied": [],
                    "leads": [],
                    "recruiter_chats": [],
                    "first_rounds": [],
                    "final_rounds": [],
                    "offers": []
                },
            
                # Distribution
            
                "applications_per_work_type": {
                    "remote": 0,
                    "hybrid": 0,
                    "onsite": 0,
                    "unknown": 0
                },
            
                "applications_per_referral_type": {
                    "cold_application": 0,
                    "referral": 0,
                    "reachout": 0
                },
            
                "applications_per_country": {
            
                },

                "leads_per_country": {
            
                },

                "sr_per_country": {
            
                },
            
                "applications_per_state": {
                    
                },

                "leads_per_state": {
                    
                },

                "sr_per_state": {
                    
                },
            
                "applications_per_city": {
                    
                },
            
                "sankey_routes": [
                    
                ],
            
                "companies": {},
            
                "word_map_companies": []
            }

            metrics['jobs_applied'] = counts['Applied']
            metrics['leads'] = counts['Passed (S)']
            metrics['first_rounds'] = counts['Passed (C)']
            metrics['final_rounds'] = counts['Passed (1R)']
            metrics['offers'] = counts['Offer']

            metrics['percentage_leads'] = metrics['leads'] / metrics['jobs_applied']
            metrics['percentage_first_rounds'] = metrics['first_rounds'] / metrics['jobs_applied']
            metrics['percentage_final_rounds'] = metrics['final_rounds'] / metrics['jobs_applied']
            metrics['percentage_offers'] = metrics['offers'] / metrics['jobs_applied']

            apps_per_country = df.groupby(['Country'])['Applied'].count()
            for i in apps_per_country.index:
                if i == '*':
                    metrics['applications_per_country']['Unknown'] = apps_per_country[i]
                else:
                    metrics['applications_per_country'][i] = apps_per_country[i]
                    metrics['applications_per_city'][i] = {}

            apps_per_country = df.groupby(['Country'])['Passed (S)'].count()
            for i in apps_per_country.index:
                if i == '*':
                    metrics['leads_per_country']['Unknown'] = apps_per_country[i]
                else:
                    metrics['leads_per_country'][i] = apps_per_country[i]
                    metrics['sr_per_country'][i] = metrics['leads_per_country'][i] / metrics['applications_per_country'][i]

            apps_per_state = df.groupby(['Country', 'State'])['Applied'].count()
            for i in apps_per_state.index:
                if i[0] == '*':
                    continue
                if i[1] == '*':
                    continue
                metrics['applications_per_state'][i[0] + '-' + i[1]] = apps_per_state[i]

            apps_per_state = df.groupby(['Country', 'State'])['Passed (S)'].count()
            for i in apps_per_state.index:
                if i[0] == '*':
                    continue
                if i[1] == '*':
                    continue
                
                if apps_per_state[i] == 0:
                    continue
                metrics['leads_per_state'][i[0] + '-' + i[1]] = apps_per_state[i]
                metrics['sr_per_state'][i[0] + '-' + i[1]] = metrics['leads_per_state'][i[0] + '-' + i[1]] / metrics['applications_per_state'][i[0] + '-' + i[1]]
            
            apps_per_city = df.groupby(['Country', 'City'])['Applied'].count()
            for i in apps_per_city.index:
                if i[0] == '*' or i[1] == '*' or i[1] == "Unknown":
                    continue
                metrics['applications_per_city'][i[0]][i[1]] = apps_per_city[i]
            
            apps_per_work_type = df.groupby(['Role Type'])['Applied'].count()
            for i in apps_per_work_type.index:
                if i == "O":
                    metrics['applications_per_work_type']['onsite'] = apps_per_work_type[i]
                elif i == "H":
                    metrics['applications_per_work_type']['hybrid'] = apps_per_work_type[i]
                elif i == "R":
                    metrics['applications_per_work_type']['remote'] = apps_per_work_type[i]
                else:
                    metrics['applications_per_work_type']['unknown'] = apps_per_work_type[i]

            apps_per_referral_type = df.groupby(['Referral'])['Applied'].count()
            for i in apps_per_referral_type.index:
                if i == "D":
                    metrics['applications_per_referral_type']['cold_application'] = apps_per_referral_type[i]
                elif i == "L":
                    metrics['applications_per_referral_type']['reachout'] = apps_per_referral_type[i]
                elif i == "R":
                    metrics['applications_per_referral_type']['referral'] = apps_per_referral_type[i]
                else:
                    metrics['applications_per_referral_type']['unknown'] = apps_per_referral_type[i]
            
            apps_per_company = df.groupby(['Company'])['Applied'].count()
            metrics['average_applications_per_company'] = apps_per_company.mean()
            metrics['total_companies_applied'] = apps_per_company.count()
            metrics['max_company_applications'] = apps_per_company.max()

            apps_per_company = df.groupby(['Company']).count()

            rounds = ['Applied', 'Passed (S)', 'Passed (C)', 'Passed (1R)', 'Offer']
            labels = ['Applied', 'Lead', 'First Round', 'Final Round', 'Offer']
            max_company = 0

            for i, round in enumerate(rounds):
                to_proc = apps_per_company[round]

                for j in to_proc.index:
                    if i == 0:
                        metrics['companies'][j] = { 
                            "roles_applied": to_proc[j], 
                            "stage": labels[i],
                            "score": to_proc[j]
                        }
                    else:
                        if to_proc[j] > 0:
                            metrics['companies'][j]['score'] = max_company + 1
                            metrics['companies'][j]['stage'] = labels[i]

                    if metrics['companies'][j]['score'] > max_company:
                        max_company = metrics['companies'][j]['score']

            for k, v in metrics['companies'].items():
                metrics['word_map_companies'].append({
                    "x": k,
                    "value": v['score'],
                    "category": v['stage']
                })

            tmp = {}

            apps_per_app_day = df.groupby(['Date'])['Applied'].count().sort_index()
            cnt = 0
            for i in apps_per_app_day.index:
                if i == '*' or i == "Unknown":
                    continue
                cnt += apps_per_app_day[i]
                metrics['time_series']['jobs_applied'].append( [i, apps_per_app_day[i]] )
                metrics['time_series_cummulative']['jobs_applied'].append( [i, cnt] )

                tmp[i] = {
                    'jobs_applied': 0,
                    'leads':0,
                    'first_rounds': 0,
                    'final_rounds': 0,
                    'offers': 0
                }
                tmp[i]['jobs_applied'] = apps_per_app_day[i]

            apps_per_app_day = df.groupby(['C Date'])['Passed (S)'].count().sort_index()
            cnt = 0
            for i in apps_per_app_day.index:
                if i == '*' or i == "Unknown":
                    continue
                cnt += apps_per_app_day[i]
                metrics['time_series']['leads'].append( [i, apps_per_app_day[i]] )
                metrics['time_series_cummulative']['leads'].append( [i, cnt] )

                if not i in tmp:
                    tmp[i] = {
                        'jobs_applied': 0,
                        'leads':0,
                        'first_rounds': 0,
                        'final_rounds': 0,
                        'offers': 0
                    }
                tmp[i]['leads'] = apps_per_app_day[i]

            apps_per_app_day = df.groupby(['1R Date'])['Passed (C)'].count().sort_index()
            cnt = 0
            for i in apps_per_app_day.index:
                if i == '*' or i == "Unknown":
                    continue
                cnt += apps_per_app_day[i]
                metrics['time_series']['first_rounds'].append( [i, apps_per_app_day[i]] )
                metrics['time_series_cummulative']['first_rounds'].append( [i, cnt] )
                if not i in tmp:
                    tmp[i] = {
                        'jobs_applied': 0,
                        'leads':0,
                        'first_rounds': 0,
                        'final_rounds': 0,
                        'offers': 0
                    }
                tmp[i]['first_rounds'] = apps_per_app_day[i]

            apps_per_app_day = df.groupby(['FR Date'])['Passed (1R)'].count().sort_index()
            cnt = 0
            for i in apps_per_app_day.index:
                if i == '*' or i == "Unknown":
                    continue
                cnt += apps_per_app_day[i]
                metrics['time_series']['final_rounds'].append( [i, apps_per_app_day[i]] )
                metrics['time_series_cummulative']['final_rounds'].append( [i, cnt] )
                if not i in tmp:
                    tmp[i] = {
                        'jobs_applied': 0,
                        'leads':0,
                        'first_rounds': 0,
                        'final_rounds': 0,
                        'offers': 0
                    }
                tmp[i]['final_rounds'] = apps_per_app_day[i]

            apps_per_app_day = df.groupby(['D Date'])['Offer'].count().sort_index()
            cnt = 0
            for i in apps_per_app_day.index:
                if i == '*' or i == "Unknown":
                    continue
                cnt += apps_per_app_day[i]
                metrics['time_series']['offers'].append( [i, apps_per_app_day[i]] )
                metrics['time_series_cummulative']['offers'].append( [i, cnt] )
                if not i in tmp:
                    tmp[i] = {
                        'jobs_applied': 0,
                        'leads':0,
                        'first_rounds': 0,
                        'final_rounds': 0,
                        'offers': 0
                    }
                tmp[i]['offers'] = apps_per_app_day[i]

            
            metrics['area_chart'] = []
            metrics['area_chart_compact'] = []

            print(metrics['time_series'])

            sdate = min(tmp.keys())
            edate = max(tmp.keys())
            dates = pd.date_range(sdate,edate-timedelta(days=1),freq='d')

            for i, d in enumerate(dates):
                metrics['area_chart'].append([d.strftime("%Y-%m-%d"), 0, 0, 0, 0, 0])
                if d in tmp:
                    metrics['area_chart'][i][1] += tmp[d]['jobs_applied']
                    metrics['area_chart'][i][2] += tmp[d]['leads']
                    metrics['area_chart'][i][3] += tmp[d]['first_rounds']
                    metrics['area_chart'][i][4] += tmp[d]['final_rounds']
                    metrics['area_chart'][i][5] += tmp[d]['offers']
                if i > 0:
                    metrics['area_chart'][i][1] += metrics['area_chart'][i - 1][1]
                    metrics['area_chart'][i][2] += metrics['area_chart'][i - 1][2]
                    metrics['area_chart'][i][3] += metrics['area_chart'][i - 1][3]
                    metrics['area_chart'][i][4] += metrics['area_chart'][i - 1][4]
                    metrics['area_chart'][i][5] += metrics['area_chart'][i - 1][5]
            
            for i, d in enumerate(dates):
                metrics['area_chart_compact'].append([d.strftime("%Y-%m-%d"), 0, 0, 0, 0])
                if d in tmp:
                    metrics['area_chart_compact'][i][1] += tmp[d]['leads']
                    metrics['area_chart_compact'][i][2] += tmp[d]['first_rounds']
                    metrics['area_chart_compact'][i][3] += tmp[d]['final_rounds']
                    metrics['area_chart_compact'][i][4] += tmp[d]['offers']
                if i > 0:
                    metrics['area_chart_compact'][i][1] += metrics['area_chart_compact'][i - 1][1]
                    metrics['area_chart_compact'][i][2] += metrics['area_chart_compact'][i - 1][2]
                    metrics['area_chart_compact'][i][3] += metrics['area_chart_compact'][i - 1][3]
                    metrics['area_chart_compact'][i][4] += metrics['area_chart_compact'][i - 1][4]

            metrics['sankey_routes'].append(['From', 'To', 'Count'])
            metrics['sankey_routes'].append(['Applied', 'Screened', counts['Passed (S)']])
            metrics['sankey_routes'].append(['Applied', 'Rejected', counts['Rejected (S)']])
            metrics['sankey_routes'].append(['Applied', 'On Hold', counts['On Hold (S)']])
            metrics['sankey_routes'].append(['Applied', 'Ghosted', counts['Ghosted 2w (S)']])
            #metrics['sankey_routes'].append(['Applied', 'Ghosted 2W (S)', counts['Ghosted 2w (S)'] - counts['Ghosted 4w (S)']])
            #metrics['sankey_routes'].append(['Applied', 'Ghosted 4W (S)', counts['Ghosted 4w (S)']])
            metrics['sankey_routes'].append(['Applied', 'In Progress', 
                                            counts['Applied'] - counts['Passed (S)'] - counts['Rejected (S)']
                                            - counts['On Hold (S)'] - counts['Ghosted 4w (S)'] -
                                            (counts['Ghosted 2w (S)'] - counts['Ghosted 4w (S)'])
                                            ])
                
            metrics['sankey_routes'].append(['Screened', 'First Round', counts['Passed (C)']])
            metrics['sankey_routes'].append(['Screened', 'Rejected', counts['Rejected (C)']])
            metrics['sankey_routes'].append(['Screened', 'On Hold', counts['On Hold (C)']])
            metrics['sankey_routes'].append(['Screened', 'Ghosted', counts['Ghosted (C)']])
            metrics['sankey_routes'].append(['Screened', 'In Progress', 
                                            counts['Passed (S)'] - counts['Passed (C)'] - counts['Rejected (C)']
                                            - counts['On Hold (C)'] - counts['Ghosted (C)']
                                            ])
                
            metrics['sankey_routes'].append(['First Round', 'Final Round', counts['Passed (1R)']])
            metrics['sankey_routes'].append(['First Round', 'Rejected', counts['Rejected (1R)']])
            metrics['sankey_routes'].append(['First Round', 'On Hold', counts['On Hold (1R)']])
            metrics['sankey_routes'].append(['First Round', 'Ghosted', counts['Ghosted (1R)']])
            metrics['sankey_routes'].append(['First Round', 'In Progress', 
                                            counts['Passed (C)'] - counts['Passed (1R)'] - counts['Rejected (1R)']
                                            - counts['On Hold (1R)'] - counts['Ghosted (1R)']
                                            ])
                
            metrics['sankey_routes'].append(['Final Round', 'Offer', counts['Offer']])
            metrics['sankey_routes'].append(['Final Round', 'Rejected', counts['Rejected (O)']])
            metrics['sankey_routes'].append(['Final Round', 'On Hold', counts['On Hold (O)']])
            metrics['sankey_routes'].append(['Final Round', 'Ghosted', counts['Ghosted (O)']])
            metrics['sankey_routes'].append(['Final Round', 'In Progress', 
                                            counts['Passed (1R)'] - counts['Offer'] - counts['Rejected (O)']
                                            - counts['On Hold (O)'] - counts['Ghosted (O)']
                                            ])
            
            metrics['sankey_routes'] = [x for i, x in enumerate(metrics['sankey_routes']) if i == 0 or x[2] > 0]
            
            times = df[df['Date'].notnull() & df['C Date'].notnull()]
            times = df[df['Date'].notnull() & df['C Date'].notnull()]
            metrics['time_to_screen'] = ((times['C Date'] - times['Date']).astype('timedelta64[h]') / 24.0).mean()

            times = df[df['C Date'].notnull() & df['1R Date'].notnull()]
            metrics['time_to_first_round'] = ((times['1R Date'] - times['C Date']).astype('timedelta64[h]') / 24.0).mean()

            times = df[df['1R Date'].notnull() & df['FR Date'].notnull()]
            metrics['time_to_final_round'] = ((times['FR Date'] - times['1R Date']).astype('timedelta64[h]') / 24.0).mean()

            times = df[df['D Date'].notnull() & df['FR Date'].notnull()]
            metrics['time_to_offer'] = ((times['D Date'] - times['FR Date']).astype('timedelta64[h]') / 24.0).mean()

            metrics['total_interviews'] = df['Total Interviews'].sum()
            metrics['total_interviewing_time'] = df['Total Interviewing Time'].sum()
            metrics['avg_total_interviews'] = df['Total Interviews'].mean()
            metrics['avg_total_interviewing_time'] = df['Total Interviewing Time'].mean()

            for k in metrics['time_series_cummulative'].keys():
                for i in range(len(metrics['time_series_cummulative'][k])):
                    metrics['time_series_cummulative'][k][i][0] = str(metrics['time_series_cummulative'][k][i][0])[0:10]

            for k in metrics['time_series'].keys():
                for i in range(len(metrics['time_series'][k])):
                    metrics['time_series'][k][i][0] = str(metrics['time_series'][k][i][0])[0:10]

            class NpEncoder(json.JSONEncoder):
                def default(self, obj):
                    if isinstance(obj, np.integer):
                        return int(obj)
                    if isinstance(obj, np.floating):
                        return float(obj)
                    if isinstance(obj, np.ndarray):
                        return obj.tolist()
                    return json.JSONEncoder.default(self, obj)

            res = json.dumps(metrics, cls=NpEncoder)
    except:
       res = "Invalid file"
    
    res
`;

export default pythonCode;