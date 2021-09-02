import smartpy as sp

class Forum(sp.Contract):
    def __init__(self):
        self.init(
            questions = []
        )

    @sp.entry_point
    def putQuestion(self, Query):
        Question_contract = sp.some(sp.create_contract(contract = Question(Query = Query, Reward = sp.amount)))
        self.data.questions.push(Question_contract)

class Question(sp.Contract):
    def __init__(self, Query, Reward):
        self.init(
            query = Query,
            #asker = sp.sender,
            reward = Reward,
            answer_author = [],
            answers = []
        )

    @sp.entry_point
    def sendAnswer(self, params):
        self.data.answers.push(params)
"""
@sp.add_test(name = "Question")
def test():
    scenario = sp.test_scenario()

    question =  Question(Query = "What is tezos?", Reward = 100)

    scenario += question

    scenario += question.sendAnswer("A blockchain")
    scenario += question.sendAnswer("A crypto")
"""
@sp.add_test(name = "Forum")
def test():
    scenario = sp.test_scenario()

    forum =  Forum()
    forum.set_initial_balance(sp.tez(10))

    scenario += forum

    forum.putQuestion(Query = "What is tezos?")
