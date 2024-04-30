import Tabs from "../src/index.js";

const defaultMarkup = `
<div class="tabs">
  <div class="tabs__items" role="tablist">
      <div aria-controls="default-tabpanel-1" aria-selected="true" class="tabs__item" id="tab-1" role="tab">
          <span>Tab 1</span>
      </div>
      <div aria-controls="default-tabpanel-2" aria-selected="false" class="tabs__item" id="tab-2" role="tab">
          <span>Tab 2</span>
      </div>
      <div aria-controls="default-tabpanel-3" aria-selected="false" class="tabs__item" id="tab-3" role="tab">
          <span>Tab 3</span>
      </div>
  </div>
  <div class="tabs__content">
      <div aria-labelledby="tab-1" class="tabs__panel" id="tabpanel-1" role="tabpanel">
          <div class="tabs__cell">
              <h3>Panel 1 Title</h3>
              <p> Panel 1 Content</p>
          </div>
      </div>
      <div aria-labelledby="tab-2" class="tabs__panel" hidden id="tabpanel-2" role="tabpanel">
          <div class="tabs__cell">
              <h3>Panel 2 Title</h3>
              <p> Panel 2 Content</p>
          </div>
      </div>
      <div aria-labelledby="tab-3" class="tabs__panel" hidden id="tabpanel-3" role="tabpanel">
          <div class="tabs__cell">
              <h3>Panel 3 Title</h3>
              <p> Panel 3 Content</p>
          </div>
      </div>
  </div>
</div>`;

describe("given tabs with default markup", function () {
  document.body.innerHTML = defaultMarkup;

  const tabs1 = new Listbox(document.querySelector(".tabs"));
});
