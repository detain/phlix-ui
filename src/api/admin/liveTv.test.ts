import { describe, it, expect, vi } from 'vitest';
import { AdminLiveTvApi } from './liveTv';
import type { ApiClient } from '../client';

/** A mock ApiClient whose verbs are vi.fn()s the test can assert on. */
function makeClient() {
  const get = vi.fn();
  const post = vi.fn();
  const put = vi.fn();
  const patch = vi.fn();
  const del = vi.fn();
  const client = { get, post, put, patch, delete: del } as unknown as ApiClient;
  return { api: new AdminLiveTvApi(client), get, post, put, patch, del };
}

const sampleTuner = {
  tuner_id: 'tuner-1',
  type: 'HDHomeRun',
  name: 'Front Room',
  host: '192.168.1.100',
  port: 5004,
  enabled: true,
  status: 'active',
};
const sampleChannel = { id: 'ch-1', name: 'BBC One', number: '1', enabled: true };
const sampleProgram = {
  id: 'prog-1',
  title: 'Evening News',
  start_time: 1700000000,
  end_time: 1700003600,
};
const sampleRecording = {
  id: 'rec-1',
  channel_id: 'ch-1',
  program_title: 'Movie',
  start_time: 1700000000,
  end_time: 1700007200,
  status: 'completed',
};
const sampleRule = {
  id: 'rule-1',
  title_pattern: 'News%',
  channel_id: 'ch-1',
  enabled: true,
};

describe('AdminLiveTvApi — tuners', () => {
  it('listTuners() GETs the tuners endpoint and unwraps { tuners }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ tuners: [sampleTuner] });
    const res = await api.listTuners();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners');
    expect(res).toEqual([sampleTuner]);
  });

  it('listTuners() degrades to [] when tuners is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listTuners()).toEqual([]);
  });

  it('getTuner(id) GETs the tuner-by-id endpoint and unwraps { tuner }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ tuner: sampleTuner });
    const res = await api.getTuner('tuner-1');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/tuner-1');
    expect(res).toEqual(sampleTuner);
  });

  it('getTuner(id) encodes the id segment', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ tuner: sampleTuner });
    await api.getTuner('a/b c');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/a%2Fb%20c');
  });

  it('scanTuners() POSTs the scan endpoint and unwraps { tuners }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ tuners: [sampleTuner] });
    const res = await api.scanTuners();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/scan');
    expect(res).toEqual([sampleTuner]);
  });

  it('scanTuners() degrades to [] when tuners is not an array', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true });
    expect(await api.scanTuners()).toEqual([]);
  });

  it('updateTuner() PUTs name + enabled and unwraps { tuner }', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({ tuner: { ...sampleTuner, name: 'New Name', enabled: false } });
    const res = await api.updateTuner('tuner-1', { name: 'New Name', enabled: false });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/tuner-1', {
      name: 'New Name',
      enabled: false,
    });
    expect(res.name).toBe('New Name');
  });

  it('deleteTuner() DELETEs the tuner-by-id endpoint', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ success: true });
    const res = await api.deleteTuner('tuner-1');
    expect(del).toHaveBeenCalledWith('/api/v1/admin/livetv/tuners/tuner-1');
    expect(res.success).toBe(true);
  });
});

describe('AdminLiveTvApi — channels', () => {
  it('listChannels() GETs the channels endpoint and unwraps { channels }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ channels: [sampleChannel] });
    const res = await api.listChannels();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/channels');
    expect(res).toEqual([sampleChannel]);
  });

  it('listChannels() degrades to [] when channels is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listChannels()).toEqual([]);
  });

  it('getChannel(id) GETs the channel-by-id endpoint and unwraps { channel }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ channel: sampleChannel });
    const res = await api.getChannel('ch-1');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/channels/ch-1');
    expect(res).toEqual(sampleChannel);
  });
});

describe('AdminLiveTvApi — guide', () => {
  it('listGuide() GETs the guide endpoint with no params and unwraps { programs }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ programs: [sampleProgram] });
    const res = await api.listGuide();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/guide', {});
    expect(res).toEqual([sampleProgram]);
  });

  it('listGuide() passes channel_id + from/to as string query params', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ programs: [] });
    await api.listGuide({ channel_id: 'ch-1', from: 1700000000, to: 1700100000 });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/guide', {
      channel_id: 'ch-1',
      from: '1700000000',
      to: '1700100000',
    });
  });

  it('listGuide() handles a zero from timestamp (uses !== undefined)', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ programs: [] });
    await api.listGuide({ from: 0, to: 0 });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/guide', { from: '0', to: '0' });
  });

  it('listGuide() degrades to [] when programs is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listGuide()).toEqual([]);
  });

  it('getProgram(id) GETs the program-by-id endpoint and unwraps { program }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ program: sampleProgram });
    const res = await api.getProgram('prog-1');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/guide/programs/prog-1');
    expect(res).toEqual(sampleProgram);
  });

  it('refreshGuide() POSTs days_ahead and returns the count', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ programs: 42 });
    const res = await api.refreshGuide(14);
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/guide/refresh', { days_ahead: 14 });
    expect(res).toBe(42);
  });

  it('refreshGuide() POSTs undefined body when no daysAhead', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ programs: 3 });
    await api.refreshGuide();
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/guide/refresh', undefined);
  });

  it('refreshGuide() degrades to 0 when programs is not a number', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ success: true });
    expect(await api.refreshGuide()).toBe(0);
  });
});

describe('AdminLiveTvApi — recordings', () => {
  it('listRecordings() GETs the recordings endpoint and unwraps { recordings }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ recordings: [sampleRecording] });
    const res = await api.listRecordings();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', {});
    expect(res).toEqual([sampleRecording]);
  });

  it('listRecordings() passes a status filter', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ recordings: [] });
    await api.listRecordings({ status: 'completed' });
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', { status: 'completed' });
  });

  it('listRecordings() degrades to [] when recordings is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listRecordings()).toEqual([]);
  });

  it('getRecording(id) GETs the recording-by-id endpoint and unwraps { recording }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ recording: sampleRecording });
    const res = await api.getRecording('rec-1');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings/rec-1');
    expect(res).toEqual(sampleRecording);
  });

  it('createRecording() POSTs all fields and unwraps { recording }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ recording: { ...sampleRecording, id: 'rec-new' } });
    const res = await api.createRecording({
      channel_id: 'ch-1',
      start_time: 1700000000,
      end_time: 1700003600,
      title: 'Test Recording',
      program_id: 'prog-1',
      priority: 3,
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings', {
      channel_id: 'ch-1',
      start_time: 1700000000,
      end_time: 1700003600,
      title: 'Test Recording',
      program_id: 'prog-1',
      priority: 3,
    });
    expect(res.id).toBe('rec-new');
  });

  it('deleteRecording() DELETEs the recording-by-id endpoint', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ success: true });
    const res = await api.deleteRecording('rec-1');
    expect(del).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings/rec-1');
    expect(res.success).toBe(true);
  });

  it('listUpcoming() GETs the upcoming endpoint with the default limit', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ recordings: [sampleRecording] });
    const res = await api.listUpcoming();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings/upcoming', { limit: '10' });
    expect(res).toEqual([sampleRecording]);
  });

  it('listUpcoming() passes an explicit limit', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ recordings: [] });
    await api.listUpcoming(25);
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings/upcoming', { limit: '25' });
  });

  it('listUpcoming() degrades to [] when recordings is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listUpcoming()).toEqual([]);
  });

  it('listBySeries() GETs the by-series endpoint and unwraps { recordings }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ recordings: [sampleRecording] });
    const res = await api.listBySeries('series-abc');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/recordings/series/series-abc');
    expect(res).toEqual([sampleRecording]);
  });

  it('listBySeries() degrades to [] when recordings is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listBySeries('series-abc')).toEqual([]);
  });
});

describe('AdminLiveTvApi — series rules', () => {
  it('listSeriesRules() GETs the series-rules endpoint and unwraps { rules }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ rules: [sampleRule] });
    const res = await api.listSeriesRules();
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules');
    expect(res).toEqual([sampleRule]);
  });

  it('listSeriesRules() degrades to [] when rules is not an array', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({});
    expect(await api.listSeriesRules()).toEqual([]);
  });

  it('getSeriesRule(id) GETs the rule-by-id endpoint and unwraps { rule }', async () => {
    const { api, get } = makeClient();
    get.mockResolvedValue({ rule: sampleRule });
    const res = await api.getSeriesRule('rule-1');
    expect(get).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules/rule-1');
    expect(res).toEqual(sampleRule);
  });

  it('createSeriesRule() POSTs the body and unwraps { rule }', async () => {
    const { api, post } = makeClient();
    post.mockResolvedValue({ rule: { ...sampleRule, id: 'rule-new' } });
    const res = await api.createSeriesRule({
      series_id: 'series-1',
      channel_id: 'ch-1',
      title: 'News Recordings',
      priority: 3,
    });
    expect(post).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules', {
      series_id: 'series-1',
      channel_id: 'ch-1',
      title: 'News Recordings',
      priority: 3,
    });
    expect(res.id).toBe('rule-new');
  });

  it('updateSeriesRule() PUTs partial data and unwraps { rule }', async () => {
    const { api, put } = makeClient();
    put.mockResolvedValue({ rule: { ...sampleRule, priority: 5 } });
    const res = await api.updateSeriesRule('rule-1', { priority: 5 });
    expect(put).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules/rule-1', { priority: 5 });
    expect(res.priority).toBe(5);
  });

  it('deleteSeriesRule() DELETEs the rule-by-id endpoint', async () => {
    const { api, del } = makeClient();
    del.mockResolvedValue({ success: true });
    const res = await api.deleteSeriesRule('rule-1');
    expect(del).toHaveBeenCalledWith('/api/v1/admin/livetv/series-rules/rule-1');
    expect(res.success).toBe(true);
  });
});
