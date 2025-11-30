const axios = require('axios');


exports.checkLecoBalance = async (req, res) => {
    const accountNumber = req.body.leco;
    const name = req.body.name;

    const url = "https://ipg.leco.lk/Token/GetDetails";

    const payload = {
        type: "ARN",
        payno: accountNumber
    };

    const headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'en-US,en;q=0.9,si;q=0.8',
        'content-type': 'application/json; charset=UTF-8',
        'origin': 'https://ipg.leco.lk',
        'priority': 'u=1, i',
        'referer': 'https://ipg.leco.lk/',
        'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        'Cookie': '_ga=GA1.1.750487636.1763963157; _ga_WKPC1P80LV=GS2.1.s1763963157$o1$g1$t1763963321$j46$l0$h0; .AspNetCore.Mvc.CookieTempDataProvider=CfDJ8LkgkXjDRzdIol0vGX1VTFE2iXMbx3BTNHkH_ltFalZAgNhNcqLgzyJHoadR8XRtxUcf7QHHQ70vjtvv56Enifnxq5avtdAOSHsviYX6q8Zgj4IdhGGlq0Rucqpzfae0f7yn-eDF1LoWU-SsIJscK5khchbNllVvuF4Ih2ukdVENcTRvVPxdkfligHQKuQott14VnHd5RiG7rGL1qVianl5-qOzla_Qo70Ev7q0_Rg4Do9fdF8UvyWTWOA1x7i0Laev4VErinBFgf1cUnW64JiG_mSbgRUmnJRYhCznEEjwh-eHJ03wrt_C9l_FmpFgBc2RU00KFWReejgsiivKbBr6IVmntIYVxkUzDCW7qtiC7FZqc8ohqTGbjXcj4bElhx2oVqHD0wMChFmflXmrQcLSuKg2B6XUMbpv2PeepxAIx; .AspNetCore.Session=CfDJ8LkgkXjDRzdIol0vGX1VTFGeWeSPUN6bY736y50qckqAj5yfP0%2BItiKk%2FZmZZ9FwttRueDX7aqR0CD2QvLimV7cz60IEyhBw9P%2FnblWeZyP6n%2BWKylU0DO7x3XcPGGsFcG%2BTiP1B8VVkOMm6KyU80bU%2Ba8WiGXycZ5v5mlP4hD77; .AspNetCore.Mvc.CookieTempDataProvider=CfDJ8LkgkXjDRzdIol0vGX1VTFHvEmxIwwE7HR6GVkLtBmh2htXfuc197VYpsmwfvPpZKRO2CHxcKMto5SbT1aafGhUbZJ5pMDzihzqdDdAVkoDJomK9SZNQVpEgVokTwU5opizGzbx6mdBfm7iEK1QFFmtAk0NXcSsl1_zxKFQrt1CbIitFwshlOhmSIr1DMipF9ztOHQYtPhBkzk6gh_NVCNK3pmjHhoaj-Qrsu8-nUfJSOcrRiz7C8zMiu1grgMf_r3auLpqvo_62FmUMftb91LMZPfiEQ3LNkVcWric48nvDiNlQN9LE6BMSK48CvB9oLKoEm4pePRqhxOWHjRqXyf7zZtP4nCZ4IHzIVr3VA1In1wW6DqolP6jXB6D4Ky6L7xgpoMiE2RAAVb96dFjsxmMjYMYDoiUiVwgSiTJYqUTJ'
    };

    try {
        const response = await axios.post(url, payload, { headers });

        res.json({
            status: "success",
            name: name,
            data: response.data
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to get LECO details" });
    }
}