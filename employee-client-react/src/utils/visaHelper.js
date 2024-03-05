// currentStep => currentDoc
// currentStatus => currentStatus of the doc
// rejFeedback => reject feedback
// docId
// docUrl
const STEPS = ['OPT Receipt', 'OPT EAD', 'I983', 'I20'];
const currentDocOfPage = (currentStep, currentStatus) => {
    if (currentStatus !== 'Approved') {
        return { currentStep, currentStatus };
    }
    const nextIdx = STEPS.indexOf(currentStatus) + 1;
    return { currentStep: STEPS[nextIdx], currentStatus: 'Await' };
};
export default currentDocOfPage;
