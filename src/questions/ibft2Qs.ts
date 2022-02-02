import { CryptoCurve } from "../types/cryptoCurve";
import { QuestionTree } from "../types/questions";
import { getYesNoValidator, integerValidator, passwordValidator, stringValidator } from "./common";
import * as commonQs from "./commonQs";


const _outputUserInputs: QuestionTree = Object.assign({}, commonQs.outputUserInputs);
_outputUserInputs.transformerValidator = getYesNoValidator(_outputUserInputs, undefined, "y");

const _privacyQuestion: QuestionTree = Object.assign({}, commonQs.privacyQuestion);
_privacyQuestion.transformerValidator = passwordValidator(_privacyQuestion, _outputUserInputs);

const _permissionQuestion: QuestionTree = Object.assign({}, commonQs.permissionQuestion);
_permissionQuestion.transformerValidator = getYesNoValidator(_permissionQuestion, _privacyQuestion, "y");

const _staticNodesQuestion: QuestionTree = Object.assign({}, commonQs.staticNodesQuestion);
_staticNodesQuestion.transformerValidator = getYesNoValidator(_staticNodesQuestion, _permissionQuestion, "y");

const _curveQuestion: QuestionTree = Object.assign({}, commonQs.curveQuestion);
_curveQuestion.options = [
  { label: "secp256k1", value: CryptoCurve.k1, nextQuestion: _staticNodesQuestion, default: true },
  { label: "secp256r1", value: CryptoCurve.r1, nextQuestion: _staticNodesQuestion }
];

const _bootnodesQuestion: QuestionTree = Object.assign({}, commonQs.bootnodesQuestion);
_bootnodesQuestion.transformerValidator = integerValidator(_bootnodesQuestion, _curveQuestion, 2);

const _membersQuestion: QuestionTree = Object.assign({}, commonQs.membersQuestion);
_membersQuestion.transformerValidator = integerValidator(_membersQuestion, _bootnodesQuestion, 1);

const _validatorsQuestion: QuestionTree = Object.assign({}, commonQs.validatorsQuestion);
_validatorsQuestion.transformerValidator = integerValidator(_validatorsQuestion, _membersQuestion, 4);

const _gasLimitQuestion: QuestionTree = Object.assign({}, commonQs.gasLimitQuestion);
_gasLimitQuestion.transformerValidator = stringValidator(_gasLimitQuestion, _validatorsQuestion);

const _gasFreeQuestion: QuestionTree = Object.assign({}, commonQs.gasFreeQuestion);
_gasFreeQuestion.transformerValidator = getYesNoValidator(_gasFreeQuestion, _gasLimitQuestion, 'y');

const _difficultyQuestion: QuestionTree = Object.assign({}, commonQs.difficultyQuestion);
_difficultyQuestion.transformerValidator = stringValidator(_difficultyQuestion, _gasFreeQuestion, '0x1');

const _epochQuestion: QuestionTree = Object.assign({}, commonQs.epochQuestion);
_epochQuestion.transformerValidator = integerValidator(_epochQuestion, _difficultyQuestion);

const _requestTimeoutQuestion: QuestionTree = Object.assign({}, commonQs.requestTimeoutQuestion);
_requestTimeoutQuestion.transformerValidator = integerValidator(_requestTimeoutQuestion, _epochQuestion);

const _blockPeriodQuestion: QuestionTree = Object.assign({}, commonQs.blockPeriodQuestion);
_blockPeriodQuestion.transformerValidator = integerValidator(_blockPeriodQuestion, _requestTimeoutQuestion);

export const _chainIDQuestion: QuestionTree = Object.assign({}, commonQs.chainIDQuestion);
_chainIDQuestion.transformerValidator = integerValidator(_chainIDQuestion, _blockPeriodQuestion);
