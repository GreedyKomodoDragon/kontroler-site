---
title: "Licensing Strategy"
description: "Understanding Kontroler's open source commitment and licensing approach"
---

## Open Source Commitment

Kontroler is proudly open source software, licensed under the GNU General Public License v3.0 (GPL-3.0). This choice reflects our commitment to maintaining a truly open ecosystem where improvements benefit the entire community.

## Why GPL-3.0?

We chose the GPL-3.0 license for the core Kontroler components for several important reasons:

1. **Ensuring Open Development**: Any modifications to Kontroler must be shared back with the community, fostering collaborative improvement
2. **Protecting Innovation**: Prevents closed-source forks from privatizing community-driven enhancements
3. **Building Trust**: Users can always access, audit, and modify the code they're running
4. **Community First**: Ensures that enterprise improvements benefit everyone

## Client Libraries Exception

We understand that the GPL license can be restrictive for some organizations. To address this, we maintain a clear separation:

- **Core Components**: Licensed under GPL-3.0
  - Controller
  - API Server
  - Web Interface
  - Core Libraries

- **Client Libraries**: Licensed under Apache 2.0
  - Language-specific SDKs
  - Integration Libraries
  - API Client Tools

These client libraries will be in a different location to that of the core code within Github. Examples in this site are also not subject to the GPL licensing and can be used freely.

This dual-licensing approach allows:
- Companies to safely integrate with Kontroler without GPL obligations
- Developers to build proprietary applications using our client libraries
- Flexible adoption while maintaining core open source principles

## Integration Considerations

When integrating with Kontroler:

- Using the API or client libraries does not trigger GPL requirements
- Custom task implementations remain your intellectual property
- Workflow definitions are not affected by the license e.g. use of the DAG and DagRun API
- Direct modifications to core components must be shared back

## Contributing Back

We encourage:
- Finding improvements to core functionality
- Contributing bug fixes and enhancements
- Building and sharing foundational tasks defintions
- Participating in the open source community

Our licensing strategy aims to create a sustainable open source project while respecting business needs for integration flexibility. We are more than happy to improve the boundary between open source and commerical usage if you have any ideas!

