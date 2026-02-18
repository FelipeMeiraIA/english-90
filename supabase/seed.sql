-- ============================================================
-- English 90 — Seed: plan_days (90 days curriculum)
-- ============================================================

truncate plan_days restart identity cascade;

insert into plan_days
  (day_number, phase, week_number, focus_title, theme,
   item_1_type, item_1, item_1_example,
   item_2_type, item_2, item_2_example,
   connection_prompt, notes)
values

-- ═══════════════════════════════════════
-- PHASE 1 — Weeks 1-4 (Days 1-30)
-- ═══════════════════════════════════════

-- WEEK 1: Basic Connectors
(1, 1, 1, 'Addition & Contrast', 'Daily Life',
 'connector', 'AND', 'I study English and practice speaking every day.',
 'connector', 'BUT', 'I want to improve, but I need more practice.',
 'Write two facts about yourself connected with AND, then add a challenge using BUT.',
 'AND adds information. BUT introduces contrast or surprise.'),

(2, 1, 1, 'Cause & Effect', 'Motivation',
 'connector', 'BECAUSE', 'I study English because I want better opportunities.',
 'connector', 'SO', 'I was tired, so I took a break.',
 'Explain why you are learning English using BECAUSE, then describe the result using SO.',
 'BECAUSE explains a reason. SO shows the result of something.'),

(3, 1, 1, 'Concession', 'Learning',
 'connector', 'ALTHOUGH', 'Although it is difficult, I keep practising.',
 'connector', 'EVEN THOUGH', 'Even though I make mistakes, I don''t give up.',
 'Describe a challenge you face. Use ALTHOUGH or EVEN THOUGH to show you keep going.',
 'Both mean the same thing. EVEN THOUGH is slightly stronger in emphasis.'),

(4, 1, 1, 'Formal Contrast & Consequence', 'Goals',
 'connector', 'HOWEVER', 'I wanted to quit. However, I decided to continue.',
 'connector', 'THEREFORE', 'I practise daily; therefore, I am improving fast.',
 'State a goal, add a difficulty using HOWEVER, then show your solution using THEREFORE.',
 'HOWEVER and THEREFORE are more formal. Great for writing and professional speech.'),

(5, 1, 1, 'Simultaneity & Alternative', 'Time Management',
 'connector', 'WHILE', 'I listen to podcasts while I commute to work.',
 'connector', 'INSTEAD OF', 'I study English instead of watching TV at night.',
 'Describe two activities you do at the same time (WHILE) and one you replaced (INSTEAD OF).',
 'WHILE shows actions happening at the same time. INSTEAD OF shows a replacement.'),

(6, 1, 1, 'Condition & Exception', 'Choices',
 'connector', 'IF', 'If I practise every day, I will reach my goal.',
 'connector', 'UNLESS', 'I will improve unless I stop practising.',
 'Write a condition for your success using IF and a warning using UNLESS.',
 'IF introduces a condition. UNLESS means "except if" — the negative condition.'),

(7, 1, 1, 'Sequencing — Review Day', 'Review',
 'connector', 'FIRST / THEN / FINALLY', 'First I review vocabulary, then I write sentences, and finally I read them aloud.',
 'connector', 'AS A RESULT', 'I studied hard. As a result, I felt more confident.',
 'Describe your English study routine using FIRST, THEN, FINALLY and show the outcome with AS A RESULT.',
 'Review week 1. Try to use all connectors from the week in one short paragraph.'),

-- WEEK 2: Essential Structures
(8, 1, 2, 'Opinion Structures', 'Opinions',
 'structure', 'I THINK THAT', 'I think that consistency is the key to learning English.',
 'structure', 'I BELIEVE THAT', 'I believe that speaking practice is more important than grammar rules.',
 'Share your opinion on learning English using I THINK THAT for one point and I BELIEVE THAT for another.',
 'These structures soften statements and make you sound more natural and diplomatic.'),

(9, 1, 2, 'Feelings & Ongoing Actions', 'Emotions',
 'structure', 'I FEEL LIKE', 'I feel like my English is finally starting to improve.',
 'structure', 'I''M TRYING TO', 'I''m trying to speak more naturally without translating.',
 'Describe how you feel about your progress using I FEEL LIKE, then explain what you are working on with I''M TRYING TO.',
 'I FEEL LIKE is casual and expressive. I''M TRYING TO shows ongoing effort.'),

(10, 1, 2, 'Needs & Desires', 'Goals',
 'structure', 'I NEED TO', 'I need to practise speaking more often.',
 'structure', 'I WANT TO', 'I want to have real conversations without hesitating.',
 'Write what you need to do and what you want to achieve in your English journey.',
 'I NEED TO implies necessity. I WANT TO expresses desire or ambition.'),

(11, 1, 2, 'Recent & Past Habits', 'Past vs Present',
 'structure', 'I''VE BEEN', 'I''ve been studying English for three months.',
 'structure', 'I USED TO', 'I used to think English was too hard to learn.',
 'Describe something you have been doing recently (I''VE BEEN) and something from the past (I USED TO).',
 'I''VE BEEN + gerund = action that started in the past and continues. I USED TO = past habit no longer true.'),

(12, 1, 2, 'Explanation Structures', 'Logic',
 'structure', 'IT DEPENDS ON', 'It depends on how much you practise every day.',
 'structure', 'THE REASON WHY', 'The reason why I study English is to get better opportunities.',
 'Explain why something is not simple using IT DEPENDS ON, then give your main motivation using THE REASON WHY.',
 'These structures help you give nuanced, thoughtful answers in conversation.'),

(13, 1, 2, 'Preferences & Highlights', 'Preferences',
 'structure', 'WHAT I LIKE ABOUT', 'What I like about this method is that it builds habits slowly.',
 'structure', 'ONE OF THE THINGS THAT', 'One of the things that helps me is reviewing vocabulary daily.',
 'Describe what you enjoy about learning (WHAT I LIKE ABOUT) and one specific helpful thing (ONE OF THE THINGS THAT).',
 'These patterns help you express preference and highlight specific points naturally.'),

(14, 1, 2, 'Perspective Structures — Review', 'Review',
 'structure', 'IN MY OPINION', 'In my opinion, speaking practice should come before grammar study.',
 'structure', 'FROM MY PERSPECTIVE', 'From my perspective, small daily habits produce big results over time.',
 'Give two opinions about language learning: one with IN MY OPINION and one with FROM MY PERSPECTIVE.',
 'Review week 2. Combine opinion structures with connectors from week 1 for complex sentences.'),

-- WEEK 3: High-Frequency Verbs
(15, 1, 3, 'MAKE vs DO', 'Actions',
 'verb', 'MAKE', 'I make mistakes, but I learn from every one of them.',
 'verb', 'DO', 'I do my best to practise every single day.',
 'Write one sentence with MAKE (something you create or cause) and one with DO (an activity or effort).',
 'MAKE = create/produce/cause. DO = perform an activity. This is one of the most common confusions.'),

(16, 1, 3, 'GET vs TAKE', 'Progress',
 'verb', 'GET', 'I get better every week because I stay consistent.',
 'verb', 'TAKE', 'It takes time, but improvement always comes with practice.',
 'Describe your progress using GET and acknowledge the effort using TAKE.',
 'GET = receive, become, obtain. TAKE = grab, require, need. Both are highly versatile.'),

(17, 1, 3, 'GIVE vs FIND', 'Discovery',
 'verb', 'GIVE', 'Learning English gives me more confidence to communicate.',
 'verb', 'FIND', 'I find it easier to express myself after daily practice.',
 'Write what learning gives you (GIVE) and what you discover about yourself (FIND).',
 'GIVE = provide/cause something. FIND = discover, experience, consider.'),

(18, 1, 3, 'TRY vs KEEP', 'Persistence',
 'verb', 'TRY', 'I try to speak English even when I feel nervous.',
 'verb', 'KEEP', 'I keep practising because consistency is everything.',
 'Write about your persistence using TRY (attempt) and KEEP (continue).',
 'TRY = attempt something. KEEP = continue doing. KEEP + gerund is a powerful pattern.'),

(19, 1, 3, 'SEEM vs BECOME', 'Transformation',
 'verb', 'SEEM', 'English seemed difficult at first, but now it feels more natural.',
 'verb', 'BECOME', 'With practice, I am becoming more comfortable with the language.',
 'Describe how your perception changed using SEEM (past) and your transformation using BECOME.',
 'SEEM = appear/give the impression. BECOME = transform, change state over time.'),

(20, 1, 3, 'IMPROVE vs ACHIEVE', 'Progress',
 'verb', 'IMPROVE', 'I improve my fluency every time I speak without translating.',
 'verb', 'ACHIEVE', 'I want to achieve the ability to think directly in English.',
 'Write about your current progress using IMPROVE and your future goal using ACHIEVE.',
 'IMPROVE = get better gradually. ACHIEVE = reach a specific goal or milestone.'),

(21, 1, 3, 'BUILD vs DEVELOP — Review', 'Review',
 'verb', 'BUILD', 'I am building a strong vocabulary foundation day by day.',
 'verb', 'DEVELOP', 'I am developing my ability to express complex ideas in English.',
 'Describe what you are building and developing in your English journey.',
 'Review week 3. Combine verbs with structures and connectors from previous weeks.'),

-- WEEK 4: Advanced Connectors + Mini-Texts
(22, 1, 4, 'Concession — Advanced', 'Health',
 'connector', 'DESPITE', 'Despite feeling tired, I completed my English session today.',
 'connector', 'IN SPITE OF', 'In spite of my busy schedule, I find 15 minutes to study.',
 'Write about overcoming an obstacle today using DESPITE and IN SPITE OF.',
 'Both mean the same — use a noun or gerund after them, not a full clause.'),

(23, 1, 4, 'Addition — Emphasis', 'Lifestyle',
 'connector', 'NOT ONLY... BUT ALSO', 'Not only do I study vocabulary, but I also practise speaking.',
 'connector', 'AS WELL AS', 'I improve my listening as well as my reading skills.',
 'Describe two things you are doing well using NOT ONLY...BUT ALSO and AS WELL AS.',
 'NOT ONLY...BUT ALSO emphasizes two things. Invert the subject/verb after NOT ONLY.'),

(24, 1, 4, 'Conditional — Advanced', 'Conditions',
 'connector', 'AS LONG AS', 'As long as I stay consistent, I will improve significantly.',
 'connector', 'PROVIDED THAT', 'I will reach my goal provided that I practise daily.',
 'Set a condition for your success using AS LONG AS and PROVIDED THAT.',
 'Both mean IF in a more formal way. Often used for conditions, deals, and agreements.'),

(25, 1, 4, 'Purpose Connectors', 'Goals',
 'connector', 'IN ORDER TO', 'I study grammar in order to speak more naturally.',
 'connector', 'SO THAT', 'I practise every day so that my English becomes automatic.',
 'Write your purpose for studying using IN ORDER TO and SO THAT.',
 'IN ORDER TO + infinitive. SO THAT + subject + verb. Both express purpose clearly.'),

(26, 1, 4, 'Parallel Structures', 'Comparison',
 'connector', 'BOTH... AND', 'Both my confidence and my fluency have improved this month.',
 'connector', 'NEITHER... NOR', 'Neither fear nor laziness will stop me from reaching my goal.',
 'Write one positive statement using BOTH...AND and one determination using NEITHER...NOR.',
 'BOTH...AND joins two positive items. NEITHER...NOR joins two negative ones.'),

(27, 1, 4, 'Contrast — Time', 'Work',
 'connector', 'ON THE OTHER HAND', 'I enjoy speaking practice. On the other hand, writing takes more effort.',
 'connector', 'MEANWHILE', 'I am working on fluency. Meanwhile, I continue building my vocabulary.',
 'Contrast two aspects of your learning using ON THE OTHER HAND and MEANWHILE.',
 'ON THE OTHER HAND = contrast two sides. MEANWHILE = two things happening at the same time.'),

(28, 1, 4, 'Week 4 Connector Review', 'Review',
 'connector', 'SUCH AS', 'I use connectors such as HOWEVER, THEREFORE, and ALTHOUGH every day.',
 'connector', 'FOR EXAMPLE', 'For example, I write two sentences using new vocabulary each day.',
 'Write a short paragraph (3 sentences) using at least 4 different connectors from phase 1.',
 'Review all connectors from weeks 1 and 4. Focus on variety and natural flow.'),

(29, 1, 4, 'Reflection Structures', 'Reflection',
 'expression', 'I''VE COME TO REALIZE', 'I''ve come to realize that consistency beats intensity every time.',
 'structure', 'LOOKING BACK', 'Looking back, the most important thing was never giving up.',
 'Reflect on your first 28 days. Use I''VE COME TO REALIZE and LOOKING BACK.',
 'These structures signal maturity and self-awareness in English conversations.'),

(30, 1, 4, 'Phase 1 Final Review', 'Celebration',
 'expression', 'I''VE MADE PROGRESS', 'I''ve made significant progress over the past 30 days.',
 'expression', 'THE NEXT STEP IS', 'The next step is to focus on more advanced vocabulary and topics.',
 'Write a mini-paragraph celebrating your Phase 1 progress and setting goals for Phase 2.',
 'Congratulations on completing Phase 1! You now have a strong connector and structure foundation.'),

-- ═══════════════════════════════════════
-- PHASE 2 — Weeks 5-8 (Days 31-60)
-- ═══════════════════════════════════════

-- WEEK 5: Business
(31, 2, 5, 'Business Essentials I', 'Business',
 'word', 'DEADLINE', 'We need to meet the deadline; otherwise the client will be unhappy.',
 'word', 'PRIORITY', 'My top priority this week is finishing the project report.',
 'Write about a task you need to complete. Use DEADLINE to describe the urgency and PRIORITY to show its importance.',
 'Essential business vocabulary. DEADLINE = fixed end date. PRIORITY = most important task.'),

(32, 2, 5, 'Business Essentials II', 'Business',
 'word', 'STRATEGY', 'Our strategy is to focus on quality rather than quantity.',
 'word', 'APPROACH', 'The best approach is to break the project into smaller steps.',
 'Describe your plan for something using STRATEGY (the big picture) and APPROACH (how you do it).',
 'STRATEGY = overall plan. APPROACH = the method or way of doing something.'),

(33, 2, 5, 'Results Language', 'Business',
 'word', 'OUTCOME', 'The outcome of the meeting was a clear action plan for the team.',
 'word', 'RESULT', 'As a result of our hard work, we exceeded the sales target.',
 'Describe something you did and its OUTCOME, then show the specific RESULT it produced.',
 'OUTCOME = the final result. RESULT = consequence. Often interchangeable in business.'),

(34, 2, 5, 'Responsibility Language', 'Business',
 'word', 'STAKEHOLDER', 'We need to keep all stakeholders informed about the project changes.',
 'expression', 'BE RESPONSIBLE FOR', 'I am responsible for managing the client communications.',
 'Write about a professional responsibility. Who are the stakeholders and what are you responsible for?',
 'STAKEHOLDER = person with interest in a project. Key business and project management term.'),

(35, 2, 5, 'Negotiation Language', 'Business',
 'verb', 'NEGOTIATE', 'We negotiated the contract terms and reached a fair agreement.',
 'word', 'AGREEMENT', 'After hours of discussion, we finally reached an agreement.',
 'Describe a negotiation or compromise you made. Use NEGOTIATE and AGREEMENT.',
 'Essential for professional English. Negotiation language shows confidence and tact.'),

(36, 2, 5, 'Efficiency Language', 'Business',
 'word', 'PRODUCTIVITY', 'Working in short focused sessions improves my productivity significantly.',
 'word', 'EFFICIENCY', 'Efficiency means doing the right things, not just doing things fast.',
 'Compare being productive vs being efficient. Use both words in context.',
 'PRODUCTIVITY = output per time. EFFICIENCY = doing things without wasting resources.'),

(37, 2, 5, 'Presentation Language', 'Business',
 'structure', 'LET ME WALK YOU THROUGH', 'Let me walk you through the main points of this proposal.',
 'structure', 'THE KEY TAKEAWAY IS', 'The key takeaway is that we need to act quickly to capture the market.',
 'Practice a mini-presentation: start with LET ME WALK YOU THROUGH and end with THE KEY TAKEAWAY IS.',
 'Essential phrases for presentations and meetings. Memorize and use them confidently.'),

-- WEEK 6: Technology
(38, 2, 6, 'Tech Verbs', 'Technology',
 'verb', 'IMPLEMENT', 'We implemented the new system last quarter without any major issues.',
 'verb', 'DEPLOY', 'We deployed the update to production after thorough testing.',
 'Describe a project or task using IMPLEMENT (build/put in place) and DEPLOY (launch/release).',
 'IMPLEMENT = put a plan or system into practice. DEPLOY = release or launch (especially software).'),

(39, 2, 6, 'System Qualities', 'Technology',
 'expression', 'SCALABLE SOLUTION', 'We built a scalable solution that can handle millions of users.',
 'expression', 'ROBUST SYSTEM', 'A robust system keeps working even when something goes wrong.',
 'Describe an ideal technical or business solution using SCALABLE and ROBUST.',
 'Adjectives that describe good software/business systems. Common in tech interviews.'),

(40, 2, 6, 'User Experience', 'Technology',
 'expression', 'USER EXPERIENCE (UX)', 'A great user experience makes people want to use your product again.',
 'word', 'INTERFACE', 'The interface should be simple so users don''t need instructions.',
 'Describe a product you use. Comment on its UX and interface.',
 'UX and interface are everywhere in tech discussions. Great vocabulary for any digital product conversation.'),

(41, 2, 6, 'Data Language', 'Technology',
 'expression', 'DATA-DRIVEN', 'Our decisions are data-driven, based on real user behavior.',
 'word', 'ANALYTICS', 'We use analytics to understand how people interact with our app.',
 'Describe how you or your team use data. Use DATA-DRIVEN and ANALYTICS.',
 'Essential in modern tech and business conversations. Shows you understand modern work practices.'),

(42, 2, 6, 'Workflow Language', 'Technology',
 'word', 'AUTOMATION', 'Automation saves us hours of manual work every week.',
 'word', 'WORKFLOW', 'We designed a workflow that eliminates unnecessary steps.',
 'Describe how you handle repetitive tasks using AUTOMATION and WORKFLOW.',
 'AUTOMATION = using technology to do things automatically. WORKFLOW = sequence of tasks/processes.'),

(43, 2, 6, 'Infrastructure Language', 'Technology',
 'expression', 'CLOUD-BASED', 'Our data is stored in a cloud-based system accessible from anywhere.',
 'word', 'INFRASTRUCTURE', 'A good infrastructure ensures reliability and performance.',
 'Describe a technology setup using CLOUD-BASED and INFRASTRUCTURE.',
 'Modern tech vocabulary. Even non-developers should understand these terms.'),

(44, 2, 6, 'Tech Presentation Phrases', 'Technology',
 'structure', 'WE''RE LOOKING TO BUILD', 'We''re looking to build a platform that simplifies team communication.',
 'structure', 'THE GOAL IS TO', 'The goal is to create a seamless experience for every user.',
 'Describe a project vision or product idea using WE''RE LOOKING TO BUILD and THE GOAL IS TO.',
 'These frames help you pitch ideas and describe projects professionally in English.'),

-- WEEK 7: Mindset
(45, 2, 7, 'Perspective Language', 'Mindset',
 'word', 'PERSPECTIVE', 'Changing my perspective helped me see failure as a learning opportunity.',
 'expression', 'SHIFT YOUR MINDSET', 'To grow, you need to shift your mindset about what is possible.',
 'Write about a time you changed how you saw something using PERSPECTIVE and SHIFT YOUR MINDSET.',
 'PERSPECTIVE = point of view. Shifting your mindset is a key concept in personal development.'),

(46, 2, 7, 'Resilience Language', 'Mindset',
 'word', 'RESILIENCE', 'Resilience means bouncing back after every setback stronger than before.',
 'word', 'ADAPTABILITY', 'Adaptability is the ability to change your approach when things don''t go as planned.',
 'Describe a challenge you overcame using RESILIENCE and how you adapted using ADAPTABILITY.',
 'Two of the most valued traits in modern professional culture.'),

(47, 2, 7, 'Growth vs Fixed Mindset', 'Mindset',
 'expression', 'GROWTH MINDSET', 'A growth mindset means believing you can always improve with effort.',
 'expression', 'FIXED MINDSET', 'A fixed mindset says "I''m not good at this" and stops there.',
 'Contrast how a growth mindset person vs a fixed mindset person would react to a mistake in English.',
 'Carol Dweck''s framework. These expressions are widely used in education and business.'),

(48, 2, 7, 'Ownership Language', 'Mindset',
 'word', 'ACCOUNTABILITY', 'Taking accountability means owning your results, good or bad.',
 'word', 'OWNERSHIP', 'When you take ownership of a problem, you stop waiting for someone else to solve it.',
 'Write about a personal or professional situation where you showed accountability and ownership.',
 'These words show maturity and leadership. Extremely valued in professional contexts.'),

(49, 2, 7, 'Focus Language', 'Mindset',
 'word', 'FOCUS', 'Deep focus is the ability to work on one thing without distraction.',
 'word', 'DISCIPLINE', 'Discipline is doing what needs to be done even when you don''t feel like it.',
 'Describe your study habits using FOCUS (the state) and DISCIPLINE (the action).',
 'FOCUS = concentration. DISCIPLINE = self-control and consistent action.'),

(50, 2, 7, 'Motivation Language', 'Mindset',
 'word', 'MOTIVATION', 'Motivation gets you started; discipline keeps you going.',
 'word', 'CONSISTENCY', 'Consistency is more powerful than motivation because it doesn''t rely on feelings.',
 'Write about why you are studying English. Use MOTIVATION to explain your reason and CONSISTENCY as your strategy.',
 'Classic mindset topic. Great for interviews, essays, and casual conversation.'),

(51, 2, 7, 'Growth Expressions', 'Mindset',
 'expression', 'LEVEL UP', 'Every time I complete a session, I feel like I''m levelling up.',
 'expression', 'PUSH THROUGH', 'When it gets difficult, the key is to push through and keep going.',
 'Describe your English journey using LEVEL UP (progress) and PUSH THROUGH (overcoming obstacles).',
 'More informal, energetic expressions. Perfect for casual conversations about personal growth.'),

-- WEEK 8: Money & Freedom
(52, 2, 8, 'Investment Language', 'Money',
 'word', 'INVESTMENT', 'Learning English is the best investment I can make in my future.',
 'expression', 'RETURN ON INVESTMENT', 'The return on investment for language skills is enormous over a lifetime.',
 'Describe learning English as an investment. What is your expected return?',
 'ROI is a business term but can be used metaphorically for any effort that pays off.'),

(53, 2, 8, 'Freedom Language', 'Money',
 'expression', 'PASSIVE INCOME', 'Passive income allows you to earn money while you sleep.',
 'expression', 'FINANCIAL FREEDOM', 'Financial freedom means having enough to live life on your own terms.',
 'Define what financial freedom means to you and how passive income could help you achieve it.',
 'Key concepts in personal finance discussions. Very common in global business conversations.'),

(54, 2, 8, 'Budget Language', 'Money',
 'word', 'BUDGET', 'Setting a monthly budget helps you see exactly where your money goes.',
 'word', 'EXPENSE', 'My biggest expense is rent, which takes 40% of my income.',
 'Describe your financial habits using BUDGET (plan) and EXPENSE (spending).',
 'BUDGET = plan for spending. EXPENSE = money spent. Essential personal finance vocabulary.'),

(55, 2, 8, 'Decision Language', 'Money',
 'expression', 'OPPORTUNITY COST', 'The opportunity cost of watching TV is the study time I lose.',
 'word', 'TRADE-OFF', 'Every financial decision involves a trade-off between now and the future.',
 'Describe a decision you made using OPPORTUNITY COST (what you gave up) and TRADE-OFF.',
 'Opportunity cost is a fundamental economics concept. Using it shows sophisticated thinking.'),

(56, 2, 8, 'Value Language', 'Money',
 'word', 'VALUE', 'I invest in things that add real value to my life and career.',
 'word', 'WORTH', 'This course is absolutely worth the time and money I''m putting into it.',
 'Describe something worth investing in using VALUE (benefit) and WORTH (justification).',
 'VALUE = benefit or importance. WORTH = deserve the time, money, or effort.'),

(57, 2, 8, 'Long-term Thinking', 'Money',
 'word', 'SUSTAINABLE', 'A sustainable business model generates profit without burning out people.',
 'expression', 'LONG-TERM THINKING', 'Long-term thinking means choosing delayed rewards over instant gratification.',
 'Apply sustainable and long-term thinking to your English study plan.',
 'These concepts bridge business, money, and personal development.'),

(58, 2, 8, 'Decision Structures', 'Money',
 'structure', 'IF I HAD TO CHOOSE', 'If I had to choose one investment, I would choose education.',
 'structure', 'THE SMARTEST MOVE WOULD BE', 'The smartest move would be to start investing early and stay consistent.',
 'Make two financial or life decisions using IF I HAD TO CHOOSE and THE SMARTEST MOVE WOULD BE.',
 'Conditional structures for expressing preferences and recommendations with confidence.'),

-- Phase 2 Consolidation
(59, 2, 8, 'Phase 2 Expression Review', 'Consolidation',
 'expression', 'TO BE HONEST', 'To be honest, learning business vocabulary changed how I communicate.',
 'expression', 'FRANKLY SPEAKING', 'Frankly speaking, consistent practice is the only thing that really works.',
 'Reflect on Phase 2. Use TO BE HONEST and FRANKLY SPEAKING to share real observations.',
 'These phrases signal honesty and directness in conversation. Very natural in English.'),

(60, 2, 8, 'Phase 2 Final Review', 'Consolidation',
 'structure', 'WHAT I''VE LEARNED IS', 'What I''ve learned is that vocabulary alone is not enough — you need context.',
 'structure', 'GOING FORWARD', 'Going forward, I will focus on using vocabulary in real situations.',
 'Write a reflection on Phase 2 and set your intention for Phase 3.',
 'Congratulations on completing Phase 2! You now have strong topic-specific vocabulary.'),

-- ═══════════════════════════════════════
-- PHASE 3 — Weeks 9-13 (Days 61-90)
-- ═══════════════════════════════════════

-- WEEK 9: Argumentation
(61, 3, 9, 'Argument Basics', 'Argumentation',
 'word', 'CLAIM', 'My claim is that daily practice is more effective than weekly intensive study.',
 'word', 'EVIDENCE', 'The evidence shows that spaced repetition improves long-term retention.',
 'Make a CLAIM about something you believe and provide EVIDENCE to support it.',
 'CLAIM = what you argue. EVIDENCE = proof or support. Foundation of strong arguments.'),

(62, 3, 9, 'Counter-Argument Language', 'Argumentation',
 'word', 'COUNTERARGUMENT', 'A common counterargument is that formal classes are better than self-study.',
 'word', 'REBUTTAL', 'My rebuttal is that self-study with the right method can be even more effective.',
 'Write a counterargument to a belief you hold, then write your rebuttal.',
 'Showing you can handle opposing views makes you a sophisticated communicator.'),

(63, 3, 9, 'Adding Arguments', 'Argumentation',
 'connector', 'FURTHERMORE', 'Furthermore, research shows that connection practice improves fluency faster.',
 'connector', 'IN ADDITION', 'In addition to vocabulary, you need structure and rhythm in your speech.',
 'Continue an argument from day 61 using FURTHERMORE and IN ADDITION to add more points.',
 'These connectors show you can build a multi-point argument logically.'),

(64, 3, 9, 'Illustration Language', 'Examples',
 'connector', 'TO ILLUSTRATE', 'To illustrate, consider how a child learns a language — through use, not rules.',
 'expression', 'FOR INSTANCE', 'For instance, practising speaking for 5 minutes daily beats 1 hour weekly.',
 'Illustrate a point you believe using TO ILLUSTRATE and FOR INSTANCE with real examples.',
 'Giving examples makes abstract arguments concrete and easy to understand.'),

(65, 3, 9, 'Cause-Effect Language', 'Argumentation',
 'connector', 'CONSEQUENTLY', 'Consequently, people who practise speaking daily progress much faster.',
 'expression', 'AS A RESULT', 'As a result of his daily practice, he passed the English exam with ease.',
 'Describe a cause-and-effect relationship using CONSEQUENTLY and AS A RESULT.',
 'These connectors show logical flow between ideas — essential for essays and debates.'),

(66, 3, 9, 'Nuance Language', 'Argumentation',
 'expression', 'IT COULD BE ARGUED', 'It could be argued that grammar is overemphasised in language teaching.',
 'expression', 'SOME WOULD SAY', 'Some would say that immersion is the only true path to fluency.',
 'Present a controversial idea using IT COULD BE ARGUED and respond using SOME WOULD SAY.',
 'These phrases show intellectual humility — you present ideas as possibilities, not absolutes.'),

(67, 3, 9, 'Concession in Arguments', 'Argumentation',
 'structure', 'WHILE I UNDERSTAND', 'While I understand that grammar is important, speaking practice matters more.',
 'structure', 'THAT BEING SAID', 'That being said, ignoring grammar entirely is also a mistake.',
 'Show balanced thinking: concede a point with WHILE I UNDERSTAND, then add nuance with THAT BEING SAID.',
 'The most sophisticated English speakers acknowledge complexity. These phrases do that.'),

-- WEEK 10: Paraphrasing
(68, 3, 10, 'Clarification Language', 'Paraphrasing',
 'expression', 'IN OTHER WORDS', 'In other words, consistency is more important than talent.',
 'expression', 'TO PUT IT DIFFERENTLY', 'To put it differently, small daily actions create massive results over time.',
 'Take a complex idea and explain it simply using IN OTHER WORDS and TO PUT IT DIFFERENTLY.',
 'Paraphrasing is a core fluency skill. It shows you can express ideas in multiple ways.'),

(69, 3, 10, 'Simplification Language', 'Paraphrasing',
 'word', 'ESSENTIALLY', 'Essentially, all language learning comes down to input and practice.',
 'word', 'BASICALLY', 'Basically, if you practise daily, you will improve. It''s that simple.',
 'Simplify a complex language learning concept using ESSENTIALLY and BASICALLY.',
 'ESSENTIALLY = at the core of it. BASICALLY = in simple terms. Both signal simplification.'),

(70, 3, 10, 'Rephrasing Structures', 'Paraphrasing',
 'expression', 'WHAT I MEAN IS', 'What I mean is that you don''t need to be perfect to communicate effectively.',
 'expression', 'LET ME REPHRASE', 'Let me rephrase: fluency comes from use, not from memorizing rules.',
 'Take something complex you believe and rephrase it using WHAT I MEAN IS and LET ME REPHRASE.',
 'Essential for spoken English when you need to clarify what you said.'),

(71, 3, 10, 'Similarity Language', 'Comparison',
 'connector', 'SIMILARLY', 'Similarly, athletes who train daily outperform those who train weekly.',
 'connector', 'LIKEWISE', 'Likewise, English learners who practise daily progress much faster.',
 'Compare two related ideas or situations using SIMILARLY and LIKEWISE.',
 'These connectors help you draw parallels and build stronger comparisons.'),

(72, 3, 10, 'Contrast in Paraphrasing', 'Contrast',
 'connector', 'IN CONTRAST', 'In contrast, passive learning (just reading) is far less effective.',
 'expression', 'ON THE CONTRARY', 'On the contrary, the hardest part of learning is getting started, not staying consistent.',
 'Write a contrast between two ideas or approaches using IN CONTRAST and ON THE CONTRARY.',
 'IN CONTRAST = opposite situation. ON THE CONTRARY = the opposite is actually true.'),

(73, 3, 10, 'Conclusion Language', 'Conclusions',
 'connector', 'TO SUMMARIZE', 'To summarize, the key to fluency is daily practice, not talent.',
 'connector', 'IN CONCLUSION', 'In conclusion, anyone who commits to 15 minutes a day for 90 days will see results.',
 'Summarize your English learning philosophy using TO SUMMARIZE and IN CONCLUSION.',
 'Essential for essays, presentations, and conversations when wrapping up a point.'),

(74, 3, 10, 'Core Message Structures', 'Paraphrasing',
 'structure', 'THE MAIN POINT IS', 'The main point is that language learning is a skill, and skills require deliberate practice.',
 'structure', 'WHAT MATTERS MOST IS', 'What matters most is that you show up every day, even for just 15 minutes.',
 'Distill your biggest belief about learning into two sentences: THE MAIN POINT IS + WHAT MATTERS MOST IS.',
 'These structures help you communicate the essence of complex ideas clearly.'),

-- WEEK 11: Mini-Essays
(75, 3, 11, 'Essay Introduction', 'Mini-Essays',
 'structure', 'THIS ESSAY WILL ARGUE', 'This essay will argue that consistent daily practice outperforms intensive weekly study.',
 'structure', 'IN THIS PARAGRAPH', 'In this paragraph, I will explain why spaced repetition is so effective.',
 'Write an introduction to a mini-essay about English learning using both structures.',
 'Academic writing structures. Even in casual writing, these make your text feel organized.'),

(76, 3, 11, 'Body Paragraph Language', 'Mini-Essays',
 'structure', 'ONE REASON FOR THIS IS', 'One reason for this is that the brain consolidates information during sleep.',
 'structure', 'ANOTHER KEY POINT IS', 'Another key point is that active production forces you to recall vocabulary.',
 'Write two body paragraphs about any language learning topic using both structures.',
 'These phrases signal structure and progression in your writing.'),

(77, 3, 11, 'Conclusion Language', 'Mini-Essays',
 'structure', 'IN CONCLUSION', 'In conclusion, the evidence strongly supports a daily practice approach.',
 'structure', 'TO SUM UP', 'To sum up, consistency, active practice, and spaced repetition are the three keys.',
 'Write a conclusion for a mini-essay on a topic of your choice.',
 'A strong conclusion restates the main argument and ends with a memorable statement.'),

(78, 3, 11, 'Transition Language', 'Mini-Essays',
 'expression', 'TRANSITIONING TO', 'Transitioning to the next point, let''s consider the role of vocabulary acquisition.',
 'structure', 'BUILDING ON THIS', 'Building on this idea, we can see that output practice accelerates fluency.',
 'Practice linking two paragraphs using TRANSITIONING TO and BUILDING ON THIS.',
 'Smooth transitions make your writing feel professional and easy to follow.'),

(79, 3, 11, 'Evidence Language', 'Mini-Essays',
 'expression', 'FOR EXAMPLE', 'For example, learners who write daily sentences retain 60% more vocabulary.',
 'expression', 'THIS IS SUPPORTED BY', 'This is supported by research on spaced repetition and long-term memory.',
 'Take a claim and support it with FOR EXAMPLE and THIS IS SUPPORTED BY.',
 'Specific examples and evidence make arguments convincing and credible.'),

(80, 3, 11, 'Qualification Language', 'Mini-Essays',
 'expression', 'IT IS WORTH NOTING', 'It is worth noting that results may vary depending on the learner''s native language.',
 'word', 'ARGUABLY', 'Arguably, the most important factor is motivation, not method.',
 'Add nuance to your writing using IT IS WORTH NOTING and ARGUABLY.',
 'These words signal important qualifications — showing intellectual honesty.'),

(81, 3, 11, 'Full Mini-Essay Practice', 'Mini-Essays',
 'structure', 'PUTTING IT ALL TOGETHER', 'Putting it all together: intro, body, evidence, and conclusion create a complete argument.',
 'expression', 'THE EVIDENCE SUGGESTS', 'The evidence suggests that the 90-day method works when applied consistently.',
 'Write a complete 4-6 sentence mini-essay using at least 4 essay structures from the week.',
 'This is your synthesis day. Combine everything from week 11 into one cohesive essay.'),

-- WEEK 12: Simulations
(82, 3, 12, 'Job Interview Language', 'Interview',
 'expression', 'TELL ME ABOUT YOURSELF', 'Tell me about yourself — I''m a software developer with 5 years of experience.',
 'expression', 'MY STRENGTHS ARE', 'My strengths are problem-solving, communication, and adaptability.',
 'Practice answering "Tell me about yourself" and "What are your strengths?" in full English sentences.',
 'Job interview language. Practice saying these aloud. Fluency comes from repetition.'),

(83, 3, 12, 'Meeting Language', 'Meeting',
 'expression', 'I''D LIKE TO PRESENT', 'I''d like to present our quarterly results and new strategy.',
 'expression', 'ANY QUESTIONS OR COMMENTS?', 'Any questions or comments before we move to the next point?',
 'Practice opening a presentation and inviting questions in English.',
 'Meeting English is a specific register. Formal but not stiff. Practice for real situations.'),

(84, 3, 12, 'Debate Language', 'Debate',
 'expression', 'I AGREE WITH YOU, HOWEVER', 'I agree with you, however, I think we need to consider the risks first.',
 'expression', 'TO PLAY DEVIL''S ADVOCATE', 'To play devil''s advocate, what if we''re wrong about the market?',
 'Practice agreeing partially and challenging an idea constructively using both expressions.',
 'Debate and discussion skills make you a powerful communicator in any environment.'),

(85, 3, 12, 'Casual Conversation Language', 'Casual',
 'expression', 'HOW HAVE YOU BEEN?', 'How have you been? I haven''t seen you since the conference!',
 'expression', 'CATCH UP', 'We should catch up soon — I''d love to hear about your new project.',
 'Practice a casual conversation opener and invitation to reconnect using both expressions.',
 'Casual English is often harder than formal English. Natural, friendly conversation is a skill.'),

(86, 3, 12, 'Email Language', 'Email',
 'expression', 'I''M WRITING TO', 'I''m writing to follow up on our conversation from last week.',
 'expression', 'PLEASE FIND ATTACHED', 'Please find attached the report we discussed in yesterday''s meeting.',
 'Write a professional email opening and reference an attachment using both expressions.',
 'Email is still a primary business communication tool. Clear, direct emails save time.'),

(87, 3, 12, 'Storytelling Language', 'Storytelling',
 'expression', 'LET ME TELL YOU ABOUT', 'Let me tell you about the time I had to give a presentation in English.',
 'expression', 'THE STORY GOES LIKE THIS', 'The story goes like this: I was nervous at first, but then something clicked.',
 'Tell a short story from your English learning journey using both expressions.',
 'Storytelling is the most engaging form of communication. Practice narrative in English.'),

(88, 3, 12, 'Mixed Simulation Review', 'Simulation',
 'structure', 'PUTTING IT ALL TOGETHER', 'Putting it all together: interview, meeting, debate, email, and storytelling.',
 'expression', 'BASED ON WHAT I''VE LEARNED', 'Based on what I''ve learned, I can now handle most real English situations.',
 'Do a 15-minute simulation: pick any scenario from the week and perform it fully.',
 'Week 12 review. Combine all simulation types. Focus on confidence, not perfection.'),

-- Days 89-90: Final Consolidation
(89, 3, 13, 'Phase 3 Review', 'Final Review',
 'expression', 'REVIEW KEY CONNECTORS', 'I use connectors such as FURTHERMORE, CONSEQUENTLY, and IN CONTRAST with ease.',
 'expression', 'REVIEW KEY STRUCTURES', 'I can argue, paraphrase, and write mini-essays in English.',
 'Write a reflection on Phase 3. What are your strongest new skills? What needs more work?',
 'Review all phase 3 content. Focus on argument, paraphrase, and simulation skills.'),

(90, 3, 13, 'Graduation Day', 'Graduation',
 'expression', 'CELEBRATE YOUR PROGRESS', 'I have completed 90 days of deliberate English practice. I am not the same learner I was.',
 'expression', 'NEXT STEPS', 'My next steps are to find speaking partners, join English communities, and keep the habit.',
 'Write your final reflection: What changed? What did you learn about yourself? What comes next?',
 'You did it! 90 days. 15 minutes a day. Hundreds of sentences written. This is just the beginning.');
