var modal = require('../src/index.js');
var testData = require('./data.js');
var modalEl;
var onModal;
var onUnmodal;

function doBeforeAll(html) {
    document.querySelector('body').innerHTML = html;

    modalEl = document.querySelector('.modal');
    onModal = jasmine.createSpy('onModal');
    onUnmodal = jasmine.createSpy('onUnmodal');

    modalEl.addEventListener('modal', onModal);
    modalEl.addEventListener('unmodal', onUnmodal);
}

testData.forEach(function(data) {
    describe('makeup-modal', function() {
        describe('when modal is activated', function() {
            beforeAll(function() {
                doBeforeAll(data.html);
                modal.modal(modalEl);
            });

            afterAll(function() {
                onModal.calls.reset();
                onUnmodal.calls.reset();
            });

            it('should observe one modal event', function() {
                expect(onModal).toHaveBeenCalledTimes(1);
            });
            it('should observe zero unmodal events', function() {
                expect(onUnmodal).toHaveBeenCalledTimes(0);
            });
        });
        describe('when modal is activated then deactivated', function() {
            beforeAll(function() {
                doBeforeAll(data.html);
                modal.modal(modalEl);
                modal.unmodal();
            });

            afterAll(function() {
                onModal.calls.reset();
                onUnmodal.calls.reset();
            });

            it('should observe one modal events', function() {
                expect(onModal).toHaveBeenCalledTimes(1);
            });

            it('should observe one unmodal event', function() {
                expect(onUnmodal).toHaveBeenCalledTimes(1);
            });
        });
    });
});
