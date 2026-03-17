fixture `Isolated Sessions - HTTP Auth`
    .page('http://localhost:3000/fixtures/isolated-sessions/pages/index.html');

test('setHttpAuth attaches basic auth credentials', async t => {
    const t2 = await t.openIsolatedSession();

    // Without credentials the basic-auth server rejects the request
    await t2.navigateTo('http://localhost:3002/');

    const before = await t2.eval(() => document.querySelector('#result').textContent);

    await t.expect(before).eql('not authorized');

    await t2.setHttpAuth('username', 'password');
    await t2.navigateTo('http://localhost:3002/');

    const after = await t2.eval(() => document.querySelector('#result').textContent);

    await t.expect(after).eql('authorized');
});
