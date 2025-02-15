<script>
  import { Numeric } from "@gzlab/uui";

  import { alternative, rowOffset } from "../helper/store";
  import Fieldset from "../container/Fieldset.svelte";
</script>

<Fieldset title="Row">
  <label for="">Row offset</label>
  <Numeric name="Row offset" bind:value={$rowOffset} />
  <label for="">Alternative</label>
  <Numeric name="Alternative" bind:value={$alternative} />
</Fieldset>
