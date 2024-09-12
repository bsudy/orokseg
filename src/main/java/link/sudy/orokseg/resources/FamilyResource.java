package link.sudy.orokseg.resources;

import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.serviices.FamilyService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("families")
@CrossOrigin(origins = "http://localhost:3000")
public class FamilyResource {

    private final FamilyService familyService;

    public FamilyResource(final FamilyService familyService) {
        this.familyService = familyService;
    }

    @GetMapping
    public Iterable<Family> getFamilies() {
        return familyService.getFamilies();
    }
}
