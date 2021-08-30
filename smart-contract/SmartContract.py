import smartpy as sp

class Question(sp.Contract):
    def __init__(self, Query):
        self.init(
            query = Query,
            answers = []
        )

    @sp.entry_point
    def sendAnswer(self, params):
        self.data.answers.push(params)


@sp.add_test(name = "Question")
def test():
    scenario = sp.test_scenario()

    question =  Question(Query = "What is tezos?")

    scenario += question

    scenario += question.sendAnswer("A blockchain")
    scenario += question.sendAnswer("A crypto")
