package dz.ade.pfe.domain.commons;

import dz.ade.pfe.domain.admin.User;
import lombok.*;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "notification", schema = "pfe")
@Where(clause = "gone = false")
@Getter
@Setter
@EqualsAndHashCode(exclude = {"user"}, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification extends Auditing {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_gen")
    @SequenceGenerator(name = "notification_gen", sequenceName = "notification_seq",
            schema = "pfe", allocationSize = 1)
    protected Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "message")
    private String message;

    @Column(name = "seen")
    @Builder.Default
    private Boolean seen = false;

    @Column(name = "seen_date")
    private Date seenDate;

    @Column(name = "gone")
    @Builder.Default
    private Boolean gone = false;

    @Column(name = "gone_date")
    private Date goneDate;

    @Column(name = "notification_level")
    @Enumerated(EnumType.STRING)
    private NotificationLevel notificationLevel;

    @Column(name = "notification_action")
    @Enumerated(EnumType.STRING)
    private NotificationAction notificationAction;

    @Column(name = "action_value")
    private String actionValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
