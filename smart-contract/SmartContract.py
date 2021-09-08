import smartpy as sp

#KT1CTCf789bvC3ewbgLphn6N8UdYog8zwBSH
class Forum(sp.Contract):
    def __init__(self):
        self.init(
            questions = sp.list([])
        )

    @sp.entry_point
    def putQuestion(self, Query, Baker):
        qc = Question(Asker = sp.sender, Query = Query, Reward = sp.amount)
        c_add = sp.some(sp.create_contract(contract = qc, amount = sp.amount))
        self.data.questions.push(c_add)

    @sp.global_lambda
    def getQuestions(self):
        sp.result(self.data.questions)

class Question(sp.Contract):
    def __init__(self, Asker, Query, Reward):
        self.init(
            asker = Asker,
            query = Query,
            #reward = sp.amount,
            reward = Reward,
            answer_author = sp.list([]),
            answers = sp.list([], t = sp.TString)
        )

    @sp.entry_point
    def sendAnswer(self, params):
        self.data.answers.push(params)
        self.data.answer_author.push(sp.sender)

    @sp.entry_point
    def bestAnswer(self, params):
        sp.verify(sp.sender == self.data.asker)
        sp.send(params, self.data.reward)
"""
@sp.add_test(name = "Question")
def test():
    scenario = sp.test_scenario()

    question =  Question(Query = "What is tezos?", Reward = 100)

    scenario += question
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    scenario += question.sendAnswer("A blockchain").run(sender = alice)
    scenario += question.sendAnswer("A crypto").run(sender = alice)
"""
@sp.add_test(name = "Forum")
def test():
    scenario = sp.test_scenario()

    forum =  Forum()
    forum.set_initial_balance(sp.tez(10))

    scenario += forum
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    bbk = sp.some(bob.public_key_hash)

    forum.putQuestion(Query = "What is tezos?").run(sender = alice, amount=sp.mutez(100))
