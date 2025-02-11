<script lang="ts">
  import Download from './Input/Download.svelte';
  import DropZone from './Input/DropZone.svelte';
  import NumberPicker from './Input/NumberPicker.svelte';
  import RadioInput from './Input/RadioInput.svelte';
  import {
    currentSheet,
    selectedFormat,
    hideAnswer,
    workbook,
    langOutput,
    rowOffset,
    TemplateColumn,
    followTemplate,
    alternative,
  } from './helper/store';
  import Column from './menu/Column.svelte';
  let sheet: { txt: string; selected: boolean }[];

  workbook.subscribe((workbook) => {
    if (!workbook || !workbook.SheetNames) return;
    sheet = workbook.SheetNames.map((s: string, n: number) => ({
      txt: s,
      selected: n === 0,
    }));
  });
</script>

<div class="menu hide-print">
  <div class="choiceSelection">
    <RadioInput
      title="Sheet"
      inputChoices={sheet}
      bind:choice={$currentSheet}
    />
    <RadioInput
      title="Format"
      inputChoices={[
        { txt: 'CSV', selected: true },
        { txt: 'PDF' },
        // { txt: 'WORD', disabled: true },
        // { txt: 'PPTX', disabled: true },
        // { txt: 'QTI' },
      ]}
      bind:choice={$selectedFormat}
    />
    <RadioInput
    title="Answer"
    inputChoices={[
      { txt: 'Show', selected:true, value: false },
      { txt: 'Hide', selected: false, value: true },
    ]}
    bind:choice={$hideAnswer}
  />
    <RadioInput
      title="Langage"
      inputChoices={[{ txt: 'FR' }, { txt: 'NL' }, { txt: 'DE' }]}
      bind:choice={$langOutput}
    />

    <RadioInput
    title="Template"
    inputChoices={[
      { txt: TemplateColumn.FIN, selected: true, value: TemplateColumn.FIN },
      { txt: TemplateColumn.BOSA, selected: false,value: TemplateColumn.BOSA},
      { txt: TemplateColumn.OTHER, selected: false,value: TemplateColumn.OTHER},
    
    ]}
      bind:choice={$followTemplate}
    />
    <NumberPicker title="Row offset" bind:value={$rowOffset} />
    <NumberPicker title="Alternative" bind:value={$alternative} />
  </div>
  <Column />
  <div class="bottom">
    <Download />
    <DropZone />
  </div>
</div>

<style>
  .menu {
    z-index: 1;
    background-color: white;
    position: fixed;
    border: 2px dotted #00566b;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 85vh;
    width: fit-content;
    max-width: 400px;
  }
  .choiceSelection {
    display: flex;
    max-width: 360px;
    flex-wrap: wrap;
  }
  .choiceSelection :global(fieldset:first-child) {
    width: 100%;
  }
  .menu .bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
</style>
