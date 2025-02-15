<script lang="ts">
  import { exportToCSV } from "../helper/questions";
  import {
    currentSheet,
    selectedFormat,
    workbook,
    name,
    titleColumn,
    promptColumn,
    correctColumn,
    langOutput,
    rowOffset,
    competencyColumn,
    dimensionColumn,
    indicatorColumn,
    alternative,
  } from "../helper/store";
  import { Question } from "../helper/question";
  import { Button } from "@gzlab/uui";
  
  let linkFile: HTMLAnchorElement;

  const onClick = () => {
    const fileName = $name;
    const sheet = Question.parseSheet(
      $workbook.Sheets[$currentSheet],
      {
        title: $titleColumn,
        prompt: $promptColumn,
        correct: $correctColumn,
        competency: $competencyColumn,
        dimension: $dimensionColumn,
        indicator: $indicatorColumn,
      },
      { offset: $rowOffset, alternative: $alternative }
    );
    switch ($selectedFormat.toLocaleLowerCase()) {
      case "csv": {
        const CSVString = exportToCSV(sheet, { lang: $langOutput });

        const blob = new Blob([CSVString], { type: "text/csv;charset=utf-8," });
        const objUrl = URL.createObjectURL(blob);

        linkFile.href = objUrl;
        console.log(fileName);
        linkFile.download = fileName + " - " + $langOutput;
        linkFile.click();
        break;
      }
      case "pdf": {
        window.print();
        break;
      }
      // case 'qti': {
      //   const lang = $langOutput;
      //   const { manifest, questionsManifest } = exportToQTI(sheet, {
      //     lang,
      //   });

      //   const manifestBlob = new Blob([manifest.toString()], {
      //     type: 'text/xml',
      //   });
      //   const questionsManifestBlob = questionsManifest.map(
      //     (q) => new Blob([q.toString()], { type: 'text/xml' }),
      //   );

      //   const ex = async () => {
      //     const zipFileStream = new TransformStream();
      //     const zipFileBlobPromise = new Response(
      //       zipFileStream.readable,
      //     ).blob();

      //     const zipWriter = new ZipWriter(new BlobWriter('application/zip'));

      //     // Create manifest xml file
      //     await zipWriter.add('imsmanifest.xml', new BlobReader(manifestBlob));

      //     await Promise.all(
      //       questionsManifestBlob.map((b, n) =>
      //         zipWriter.add(`items/${n}/qti.xml`, new BlobReader(b)),
      //       ),
      //     );

      //     const finalBlob = await zipWriter.close();

      //     linkFile.setAttribute('href', URL.createObjectURL(finalBlob));
      //     linkFile.download = fileName + '.zip';
      //     linkFile.click();
      //   };
      //   ex();

      //   break;
      // }
      default: {
        console.log("Not unsuported yet");
      }
    }
  };
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={linkFile} download />
<Button type="info" {onClick}>
  <div class="button">
    <img src="file.svg" alt="FileIcon" />
    <span> Download Export</span>
  </div>
</Button>

<style>
  a {
    display: none;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    font-size: 1rem;
  }
  img {
    height: 30px;
  }
</style>
