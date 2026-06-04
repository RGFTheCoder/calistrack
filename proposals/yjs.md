# Yjs Proposal

## Why Yjs could fit CalisTrack

CalisTrack is currently planned as a local-first app with IndexedDB/localStorage persistence. Yjs would be most useful if the project expands from "single user on one browser" into "same user on multiple devices" or "small groups editing shared training data."

The main value is conflict-free synchronization. Instead of picking one device as the source of truth, Yjs can merge concurrent edits to structured workout data while preserving offline-first behavior.

## Candidate features

### 1. Multi-device account sync

**User value**
- Start or edit training data on one device and continue on another.
- Keep progression state, enabled focuses, history, and calibration data aligned without manual export/import.

**How it could work**
- Represent user-owned state as one or more Yjs documents.
- Sync those docs through a provider when the user is signed in.
- Persist a local copy so the app still works offline and can merge later.

**Good first scope**
- Sync progression levels, enabled focuses, and settings first.
- Leave active sessions and history for a later phase if needed.

### 2. Live session handoff

**User value**
- Start a workout on desktop, continue logging sets on a phone.

**How it could work**
- Model the active session as a separate Yjs document with exercises, set results, timestamps, and status.
- Use Yjs awareness for "currently active on this device" presence.
- When one device goes offline, later edits merge instead of overwriting the other device.

**Risk**
- Session logging is more write-heavy than settings sync, so conflict resolution rules should be tested carefully.

### 3. Shared coach / athlete plans

**User value**
- A coach can adjust focuses, leave notes, or suggest progression targets while the athlete can still log their own work.

**How it could work**
- Split shared plan data from private workout history.
- Use separate docs or subtrees for coach-visible plans versus athlete-only logs.
- Restrict coach edits to planning/notes fields rather than raw ownership of the athlete's full account.

**Important design note**
- This should likely be opt-in sharing, not the default account model.

### 4. Collaborative workout templates

**User value**
- A coach, training group, or future community feature could maintain shared routines together.

**How it could work**
- Store templates in their own Yjs documents.
- Support concurrent editing of exercise order, set counts, notes, and focus tags.
- Publish a template snapshot into a user's personal plan when they adopt it.

**Why this is attractive**
- Templates are easier to share safely than full user accounts because they are less privacy-sensitive.

### 5. Shared accountability and notes

**User value**
- Friends or coaches can leave lightweight comments, milestone checks, or encouragement on shared goals.

**How it could work**
- Keep comments/check-ins in a shared Yjs doc or append-only structure.
- Use awareness/presence only for lightweight "who is viewing/editing" hints, not as the source of truth.

## Ownership and access control

Yjs does not verify ownership by itself. Ownership would need to come from the auth and sync layer around the documents.

### Likely approach
- Require authenticated users before connecting to any shared provider.
- Store document metadata on the server: document id, owner id, collaborators, and role/permission rules.
- Only issue sync credentials or room access after the server verifies that the user owns or has been granted access to that document.
- Never trust a client-supplied `ownerId` or document id alone.

### Example rules
- **Personal sync docs**: only the owning account can connect.
- **Coach/athlete docs**: owner can invite collaborators with limited roles.
- **Shared templates**: editable by maintainers, read-only or forkable for everyone else.

### Practical implication
If CalisTrack stays fully local-only, ownership is irrelevant. It only becomes necessary once remote sync or shared collaboration is introduced.

## Suggested rollout order

1. **Personal multi-device sync**
   - Lowest collaboration complexity
   - Highest immediate value
2. **Live session handoff**
   - Natural extension of personal sync
3. **Shared templates**
   - Easier privacy model than account sharing
4. **Coach / athlete collaboration**
   - Most product and permission design work

## Open questions

- Should Yjs eventually replace, or just complement, the current local persistence model?
- Should workout history be shared at all, or remain private even in coach mode?
- Do comments/check-ins belong in the same docs as plans, or in separate activity records?
- Would we want a hosted provider, self-hosted sync, or a peer-to-peer approach?
