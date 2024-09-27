package link.sudy.orokseg.resources;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import javax.print.attribute.standard.Media;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import link.sudy.orokseg.serviices.MediaService;
import lombok.val;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/media")
public class MediaResource {

  // TODO get it from config / env variable
  private static final String BASE_PATH = "/home/gradle/app/media/";
  
  private final MediaService mediaService;

  public MediaResource(MediaService mediaService) {
    this.mediaService = mediaService;
  }


  @GetMapping("/{grampsId}/content")
  public ResponseEntity<InputStreamResource> getContent(@PathVariable String grampsId) throws FileNotFoundException {
    val medium = mediaService.getMediumByGrampsId(grampsId).orElseThrow();
    val contentType = MediaType.parseMediaType(medium.getMime());

    val initialFile = new File(BASE_PATH + medium.getPath());
    val in = new FileInputStream(initialFile);

    return ResponseEntity.ok()
        .contentType(contentType)
        .body(new InputStreamResource(in));
  }
  

  @GetMapping("/byHandle/{handle}/content")
  public ResponseEntity<InputStreamResource> getContentByHandle(@PathVariable String handle) throws FileNotFoundException {
    val medium = mediaService.getMediumByHandle(handle).orElseThrow();
    val contentType = MediaType.parseMediaType(medium.getMime());

    val initialFile = new File(BASE_PATH + medium.getPath());
    val in = new FileInputStream(initialFile);

    return ResponseEntity.ok()
      .contentType(contentType)
      .body(new InputStreamResource(in));
  }
  
  public void getMediaContent() {

  }
}
