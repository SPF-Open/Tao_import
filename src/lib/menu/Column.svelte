<script>
  import {
    titleColumn,
    promptColumn,
    correctColumn,
    competencyColumn,
    dimensionColumn,
    indicatorColumn,
    TemplateColumn,
    followTemplate,
  } from '../helper/store';

  import LetterPicker from '../Input/LetterPicker.svelte';
  import OptionnalLetterPicker from '../container/OptionnalLetterPicker.svelte';

  let disable = true;

  followTemplate.subscribe((format) => {
    disable = format !== TemplateColumn.OTHER;
    console.log(disable);
  });


</script>

<fieldset class="columnPicker">
  <legend>Column</legend>
  <div class="sub">
    <label for="">Title</label>
    <LetterPicker bind:value={$titleColumn} {disable}/>
    <label for="">Prompt</label>
    <LetterPicker bind:value={$promptColumn} {disable} />
    <label for="">Answer</label>
    <LetterPicker bind:value={$correctColumn} {disable} />
  </div>
  <div class="line"></div>
  <div class="sub">
    <div>
      <label for="">Competency</label>
      <OptionnalLetterPicker bind:value={$competencyColumn} />
    </div>
    <div>
      <label for="">Dimension</label>
      <OptionnalLetterPicker bind:value={$dimensionColumn} />
    </div>
    <div>
      <label for="">Indicator</label>
      <OptionnalLetterPicker bind:value={$indicatorColumn} />
    </div>
  </div>
</fieldset>

<style>
  .columnPicker {
    display: flex;
    flex-wrap: wrap;
    font-weight: bold;
    border-radius: 12px;
    border: 3px solid #00566b;
    color: #00566b;
    padding-top: 0;
    justify-content: space-around;
  }
  .columnPicker > div {
    gap: 3px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
  }
  .line {
    background-color: #00566b;
    width: 2px;
  }
  .columnPicker .sub {
    display: flex;
    flex-direction: column;
    width: 33%;
    justify-content: space-evenly;
  }
</style>
