package link.sudy.orokseg.serviices;

import java.util.Optional;
import link.sudy.orokseg.model.Medium;
import link.sudy.orokseg.repository.MediaRepository;
import link.sudy.orokseg.serviices.converters.MediaConverter;
import org.springframework.stereotype.Service;

@Service
public class MediaService {

  private final MediaRepository mediaRepository;

  public MediaService(final MediaRepository mediaRepository) {
    super();
    this.mediaRepository = mediaRepository;
  }

  public Optional<Medium> getMediumByHandle(String handle) {
    return this.mediaRepository.findById(handle).map((family) -> MediaConverter.toMedium(family));
  }
}
