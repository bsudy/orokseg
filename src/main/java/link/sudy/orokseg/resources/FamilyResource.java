package link.sudy.orokseg.resources;

import link.sudy.orokseg.model.Family;
import link.sudy.orokseg.serviices.FamilyService;
import lombok.val;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{id}")
    public Family getById(@PathVariable String id) {
        return familyService.getFamilyById(id).orElseThrow();
    }

    @GetMapping("/byHandle/{handle}")
    public Family getByHandle(@PathVariable String handle) {
        return familyService.getFamilyByHandle(handle).orElseThrow();
    }
    
}
