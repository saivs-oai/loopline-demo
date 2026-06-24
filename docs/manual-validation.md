# Manual validation

Use this smoke test after visible or timer-related changes:

1. Run `npm run dev` and open the printed local URL.
2. Confirm the page begins in **Ready** state with elapsed time `00:00:00`.
3. Select **Start run** and observe the status change to **Running**.
4. Wait three seconds. Confirm elapsed time advances, items move through all three stages, and Activity receives new entries.
5. Select **Reset**. Confirm the Ready state, seeded items, metrics, and empty Activity state are restored.
6. Repeat at a narrow viewport and confirm the pipeline and metrics stack without horizontal scrolling.

