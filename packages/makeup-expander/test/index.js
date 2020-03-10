var Expander = require('../src/index.js');

var containerEl = document.createElement('div');
containerEl.innerHTML = '<span class="expander">'
    + '<button class="expander__host"><button>'
    + '<div class="expander__content"></div>'
+ '</span>';

var widgetEl = containerEl.querySelector('.expander');
var hostEl = widgetEl.querySelector('.expander__host');
var onCollapse = jasmine.createSpy('onCollapse');
var onExpand = jasmine.createSpy('onExpand');
var widget;

widgetEl.addEventListener('expander-expand', onExpand);
widgetEl.addEventListener('expander-collapse', onCollapse);

document.body.appendChild(containerEl);

describe('given a widget with default options', function() {
    beforeAll(function() {
        widget = new Expander(widgetEl);
    });

    afterAll(function() {
        widget.destroy();
    });

    it('it should not add an expanded class', function() {
        expect(widgetEl.classList.length).toEqual(1);
    });

    describe('when widget is collapsed', function() {
        beforeAll(function() {
            widget.expanded = false;
            onCollapse.calls.reset();
        });

        afterAll(function() {
            hostEl.blur();
        });

        describe('and the host is clicked', function() {
            beforeAll(function() {
                hostEl.click();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have correct aria-expanded attribute', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the host receives focus', function() {
            beforeAll(function() {
                hostEl.focus();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should observe 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the document is clicked', function() {
            beforeAll(function() {
                document.body.click();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should observe 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });
    });
});

describe('given a widget with expandOnClick=true', function() {
    beforeAll(function() {
        widget = new Expander(widgetEl, { expandOnClick: true });
        widget.expanded = false;
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    afterAll(function() {
        widget.destroy();
        hostEl.blur();
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    it('it should not have an expanded class', function() {
        expect(widgetEl.classList.length).toEqual(1);
    });

    describe('when widget is collapsed', function() {
        describe('and the host is clicked', function() {
            beforeAll(function() {
                hostEl.click();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 1 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(1);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=true', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('true');
            });
        });

        describe('and the host is focussed', function() {
            beforeAll(function() {
                widget.expanded = false;
                onExpand.calls.reset();
                onCollapse.calls.reset();
                hostEl.focus();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the host is hovered', function() {
            beforeAll(function() {
                widget.expanded = false;
                onExpand.calls.reset();
                onCollapse.calls.reset();
                hostEl.dispatchEvent(new Event('mouseenter'));
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the document is clicked', function() {
            beforeAll(function() {
                widget.expanded = false;
                onExpand.calls.reset();
                onCollapse.calls.reset();
                document.body.click();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should observe 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });
    });
});

describe('given a widget with expandOnFocus=true', function() {
    beforeAll(function() {
        widget = new Expander(widgetEl, { expandOnFocus: true });
        widget.expanded = false;
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    afterAll(function() {
        widget.destroy();
        hostEl.blur();
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    it('it should not have an expanded class', function() {
        expect(widgetEl.classList.length).toEqual(1);
    });

    describe('when widget is collapsed', function() {
        describe('and the host is focussed', function() {
            beforeAll(function() {
                hostEl.focus();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 1 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(1);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=true', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('true');
            });
        });

        describe('and the host is clicked', function() {
            beforeAll(function() {
                hostEl.click();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the host is hovered', function() {
            beforeAll(function() {
                hostEl.dispatchEvent(new Event('mouseenter'));
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the document is clicked', function() {
            beforeAll(function() {
                document.body.click();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should observe 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });
    });
});

describe('given a widget with expandOnHover=true', function() {
    beforeAll(function() {
        widget = new Expander(widgetEl, { expandOnHover: true });
        widget.expanded = false;
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    afterAll(function() {
        widget.destroy();
        hostEl.dispatchEvent(new Event('mouseenter'));
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    it('it should not have an expanded class', function() {
        expect(widgetEl.classList.length).toEqual(1);
    });

    describe('when widget is collapsed', function() {
        describe('and the host is focussed', function() {
            beforeAll(function() {
                hostEl.focus();
            });

            afterAll(function() {
                widget.expanded = false;
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the host is clicked', function() {
            beforeAll(function() {
                hostEl.click();
            });

            afterAll(function() {
                widget.expanded = false;
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });

        describe('and the host is hovered', function() {
            beforeAll(function() {
                hostEl.dispatchEvent(new Event('mouseenter'));
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.dispatchEvent(new Event('mouseout'));
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 1 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(1);
            });

            it('it should trigger 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=true', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('true');
            });
        });

        describe('and the document is clicked', function() {
            beforeAll(function() {
                document.body.click();
            });

            afterAll(function() {
                widget.expanded = false;
                hostEl.blur();
                onExpand.calls.reset();
                onCollapse.calls.reset();
            });

            it('it should trigger 0 expand events', function() {
                expect(onExpand).toHaveBeenCalledTimes(0);
            });

            it('it should observe 0 collapse events', function() {
                expect(onCollapse).toHaveBeenCalledTimes(0);
            });

            it('the host el should have aria-expanded=false', function() {
                expect(hostEl.getAttribute('aria-expanded')).toEqual('false');
            });
        });
    });
});

describe('given a widget with expandedClass=foo', function() {
    beforeAll(function() {
        widget = new Expander(widgetEl, { expandedClass: 'foo--expanded' });
    });

    afterAll(function() {
        widget.expanded = false;
        widget.destroy();
        onExpand.calls.reset();
        onCollapse.calls.reset();
    });

    describe('when widget is expanded', function() {
        beforeAll(function() {
            widget.expanded = true;
        });

        it('it should contain class=foo-expanded', function() {
            expect(widgetEl.classList.contains('foo--expanded')).toEqual(true);
        });
    });

    describe('when widget is collapsed', function() {
        beforeAll(function() {
            widget.expanded = false;
        });

        it('it should not contain class=foo-expanded', function() {
            expect(widgetEl.classList.contains('foo--expanded')).toEqual(false);
        });
    });
});
